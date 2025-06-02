import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import type {
  AnimationKey,
  Dimensions,
  Frame,
  MaterialIndex,
  Palette,
  SpriteData,
} from '../../engine/types/SpriteData';
import { MkVoxel } from '../../engine/core/MkVoxel';
import { withVoxelChange } from '../utils/zustandVoxel';
import { Buffer } from 'buffer';
import { clampState } from './utils/clampState';
import {
  notifyMaterialUpdate,
  notifyMeshUpdate,
  notifySpriteDataUpdate,
} from '../utils/rendererNotifier';

type ThemeName = 'blue' | 'grey' | 'black';
export type LayoutType = 'vertical' | 'horizontal' | 'auto';
export type AspectType = 'wide' | 'normal';

const engine = new MkVoxel();
const initialSpriteData = engine.createSprite({ x: 3, y: 3, z: 3 }, 'new_sprite');
engine.addSprite(initialSpriteData);

export interface EditorStore {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  aspect: AspectType;
  setAspect: (aspect: AspectType) => void;

  spriteData: SpriteData;
  setSpriteData: (data: SpriteData) => void;
  setSpriteName: (name: string) => void;
  setSpriteFrameTime: (frameTime: number) => void;

  resizeSprite: (newDimensions: Dimensions) => void;
  setVoxel: (
    anim: AnimationKey,
    frame: number,
    x: number,
    y: number,
    z: number,
    mat: MaterialIndex
  ) => void;
  addStroke: (
    animationKey: AnimationKey,
    frameIndex: number,
    edits: { x: number; y: number; z: number; material: MaterialIndex }[]
  ) => void;
  voxelVersion: number;

  updatePalette: (newPalette: Palette) => void;

  addAnimation: (animationKey: AnimationKey) => void;
  removeAnimation: (animationKey: AnimationKey) => void;
  renameAnimation: (oldKey: AnimationKey, newKey: AnimationKey) => void;
  nudgeAnimation: (animationKey: AnimationKey, x: number, y: number, z: number) => void;

  addFrame: (animationKey: AnimationKey, pos?: number) => void;
  deleteFrame: (animationKey: AnimationKey, pos: number) => void;
  duplicateFrame: (animationKey: AnimationKey, pos: number) => void;
  setFrameTime: (animationKey: AnimationKey, frameIndex: number, time: number) => void;
  nudgeFrame: (frame: Frame, x: number, y: number, z: number) => void;

  currentAnimationKey: string;
  setCurrentAnimationKey: (name: string) => void;

  currentFrameIndex: number;
  setCurrentFrameIndex: (index: number) => void;

  currentSliceIndex: number;
  setCurrentSliceIndex: (index: number) => void;

  currentMaterialIndex: MaterialIndex;
  setCurrentMaterialIndex: (index: MaterialIndex) => void;
}

export const useEditorStore = create<EditorStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        themeName: 'grey',
        setThemeName: (name) => set({ themeName: name }),
        layout: 'auto',
        setLayout: (layout) => set({ layout }),
        aspect: 'normal',
        setAspect: (aspect) => set({ aspect }),

        spriteData: initialSpriteData,
        setSpriteData: (data) => set({ spriteData: data }),

        setSpriteName: (name) =>
          set((state) => ({
            spriteData: { ...state.spriteData, name },
          })),
        setSpriteFrameTime: (frameTime) =>
          set((state) => ({
            spriteData: { ...state.spriteData, frameTime },
          })),

        resizeSprite: (newDimensions) => {
          const updated = structuredClone(get().spriteData);
          engine.resizeSprite(updated, newDimensions);

          set((state) => ({
            spriteData: updated,
            ...clampState({ ...state, spriteData: updated }),
          }));
          notifySpriteDataUpdate(updated);
          notifyMeshUpdate();
        },

        setVoxel: (animationKey, frameIndex, x, y, z, mat) => {
          withVoxelChange((sprite) => {
            engine.setVoxel(sprite, animationKey, frameIndex, x, y, z, mat);
          });

          notifyMeshUpdate();
        },

        addStroke: (animationKey, frameIndex, edits) => {
          withVoxelChange((sprite) => {
            edits.forEach(({ x, y, z, material }) => {
              engine.setVoxel(sprite, animationKey, frameIndex, x, y, z, material);
            });
          });
          notifyMeshUpdate();
        },

        voxelVersion: 0,

        updatePalette: (newPalette) => {
          const updated = {
            ...get().spriteData,
            palette: newPalette,
          };
          set({ spriteData: updated });

          notifySpriteDataUpdate(updated);
          notifyMaterialUpdate();
        },

        addAnimation: (name) => {
          const updated = structuredClone(get().spriteData);
          engine.addAnimation(updated, name);
          set({ spriteData: updated });
        },
        removeAnimation: (name) => {
          const updated = structuredClone(get().spriteData);
          engine.removeAnimation(updated, name);
          set({ spriteData: updated });
        },
        renameAnimation: (oldKey, newKey) => {
          const updated = structuredClone(get().spriteData);
          engine.renameAnimation(updated, oldKey, newKey);
          set({ spriteData: updated });
        },
        nudgeAnimation: (animationKey, x, y, z) => {
          withVoxelChange((sprite) => {
            engine.nudgeAnimation(sprite, animationKey, x, y, z);
          });
          notifyMeshUpdate();
        },

        addFrame: (animationKey, pos) => {
          const updated = structuredClone(get().spriteData);
          engine.addFrame(updated, animationKey, 0, pos);
          set({ spriteData: updated });
        },
        deleteFrame: (animationKey, pos) => {
          set((state) => {
            console.log('state', state);
            const frames = state.spriteData.animations[animationKey]?.frames;
            if (!frames || frames.length <= 1) {
              return {}; // ✅ Do nothing if only one frame
            }

            engine.deleteFrame(state.spriteData, animationKey, pos);

            // 👇 Pick new valid frame index
            const newFrameIndex = Math.min(pos, frames.length - 2);

            return {
              currentFrameIndex: newFrameIndex,
              ...clampState(state),
            };
          });
          notifyMeshUpdate();
        },

        duplicateFrame: (animationKey, pos) => {
          const updated = structuredClone(get().spriteData);
          engine.duplicateFrame(updated, animationKey, pos);
          set({ spriteData: updated });
        },
        setFrameTime: (animationKey, frameIndex, time) => {
          const updated = structuredClone(get().spriteData);
          engine.setFrameTime(updated, animationKey, frameIndex, time);
          set({ spriteData: updated });
        },
        nudgeFrame: (frame, x, y, z) => {
          withVoxelChange((sprite) => {
            engine.nudgeFrame(frame, sprite.dimensions, x, y, z);
          });
          notifyMeshUpdate();
        },

        currentAnimationKey: Object.keys(initialSpriteData.animations)[0],
        setCurrentAnimationKey: (name) => set({ currentAnimationKey: name }),

        currentFrameIndex: 0,
        setCurrentFrameIndex: (index) => set({ currentFrameIndex: index }),

        currentSliceIndex: 0,
        setCurrentSliceIndex: (index) => set({ currentSliceIndex: index }),

        currentMaterialIndex: 1,
        setCurrentMaterialIndex: (index) => set({ currentMaterialIndex: index }),
      }),
      {
        name: 'editor-store',
        partialize: (state) => ({
          themeName: state.themeName,
          layout: state.layout,
          spriteData: state.spriteData,
          currentAnimationName: state.currentAnimationKey,
          currentFrameIndex: state.currentFrameIndex,
          currentYIndex: state.currentSliceIndex,
          currentMaterialIndex: state.currentMaterialIndex,
        }),
        storage: {
          getItem: (name: string) => {
            const str = localStorage.getItem(name);
            if (!str) return null;

            return JSON.parse(str, (_, value) =>
              value?.__type === 'Uint8Array' ? new Uint8Array(Buffer.from(value.hex, 'hex')) : value
            );
          },

          setItem: (name: string, newValue: any) => {
            const json = JSON.stringify(newValue, (_, value) =>
              value instanceof Uint8Array
                ? { __type: 'Uint8Array', hex: Buffer.from(value).toString('hex') }
                : value
            );
            localStorage.setItem(name, json);
          },

          removeItem: (name: string) => {
            localStorage.removeItem(name);
          },
        },
      }
    )
  )
);
