import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  AnimationKey,
  type Dimensions,
  type MaterialIndex,
  type Palette,
  type SpriteData,
} from '../../engine/types/SpriteData';
import { MkVoxel } from '../../engine/core/MkVoxel';
import type { MantineThemeOverride } from '@mantine/core';
import { themeBlack, themeBlue, themeGrey } from '../themes/themes';
import { setVoxel } from '../../engine/core/utils/voxel';

type ThemeName = 'blue' | 'grey' | 'black';
export type LayoutType = 'vertical' | 'horizontal' | 'auto';

const themeMap: Record<ThemeName, MantineThemeOverride> = {
  blue: themeBlue,
  grey: themeGrey,
  black: themeBlack,
};

const engine = new MkVoxel();
const initialSpriteData = engine.createSprite({ x: 3, y: 3, z: 3 }, 'new_sprite');

interface EditorStore {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  currentTheme: MantineThemeOverride;
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;

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

  addAnimation: (name: AnimationKey) => void;
  removeAnimation: (name: AnimationKey) => void;
  renameAnimation: (oldKey: AnimationKey, newKey: AnimationKey) => void;

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
  immer(
    persist(
      (set) => ({
        themeName: 'grey',
        setThemeName: (name) => set({ themeName: name, currentTheme: themeMap[name] }),
        currentTheme: themeMap['grey'],
        layout: 'auto',
        setLayout: (layout) => set({ layout: layout }),

        spriteData: initialSpriteData,
        setSpriteData: (data: SpriteData) => set({ spriteData: data }),

        setSpriteName: (name: string) => {
          set((state) => {
            state.spriteData.name = name;
          });
        },

        setSpriteFrameTime: (frameTime: number) => {
          set((state) => {
            state.spriteData.frameTime = frameTime;
          });
        },

        resizeSprite: (newDimensions: Dimensions) => {
          set((state) => {
            engine.resizeSprite(state.spriteData, newDimensions);
          });
        },

        setVoxel: (anim, frame, x, y, z, mat) => {
          set((state) => {
            engine.setVoxel(state.spriteData, anim, frame, x, y, z, mat);
          });
          set((state) => ({ voxelVersion: state.voxelVersion + 1 }));
        },

        addStroke: (animationKey, frameIndex, edits) =>
          set((state) => {
            edits.forEach(({ x, y, z, material }) => {
              setVoxel(state.spriteData, animationKey, frameIndex, x, y, z, material);
            });

            state.voxelVersion++; // mutate directly
            // optionally: add stroke to history
          }),

        voxelVersion: 0,

        updatePalette: (newPalette: Palette) => {
          set((state) => {
            state.spriteData.palette = newPalette;
          });
        },

        addAnimation: (name: AnimationKey) => {
          set((state) => {
            engine.addAnimation(state.spriteData, name);
          });
        },

        removeAnimation: (name: AnimationKey) => {
          set((state) => {
            engine.removeAnimation(state.spriteData, name);
          });
        },

        renameAnimation: (oldKey: AnimationKey, newKey: AnimationKey) => {
          set((state) => {
            engine.renameAnimation(state.spriteData, oldKey, newKey);
          });
        },

        currentAnimationKey: Object.keys(initialSpriteData.animations)[0],
        setCurrentAnimationKey: (name) => set({ currentAnimationKey: name }),

        currentFrameIndex: 0,
        setCurrentFrameIndex: (index) => set({ currentFrameIndex: index }),

        currentSliceIndex: 0,
        setCurrentSliceIndex: (index) => set({ currentSliceIndex: index }),

        currentMaterialIndex: 0,
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
        }),
      }
    )
  )
);
