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

  updatePalette: (newPalette: Palette) => void;

  currentAnimationName: string;
  setCurrentAnimationName: (name: string) => void;

  currentFrameIndex: number;
  setCurrentFrameIndex: (index: number) => void;

  currentSlice: number;
  setCurrentSlice: (index: number) => void;
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
            if (!state.spriteData) return;
            engine.resizeSprite(state.spriteData, newDimensions);
          });
        },

        setVoxel: (anim, frame, x, y, z, mat) => {
          set((state) => {
            if (!state.spriteData) return;
            engine.setVoxel(state.spriteData, anim, frame, x, y, z, mat);
          });
        },

        updatePalette: (newPalette: Palette) => {
          set((state) => {
            if (!state.spriteData) return;
            state.spriteData.palette = newPalette;
          });
        },

        currentAnimationName: Object.keys(initialSpriteData.animations)[0],
        setCurrentAnimationName: (name) => set({ currentAnimationName: name }),

        currentFrameIndex: 0,
        setCurrentFrameIndex: (index) => set({ currentFrameIndex: index }),

        currentSlice: 0,
        setCurrentSlice: (index) => set({ currentSlice: index }),
      }),
      {
        name: 'editor-store',
        partialize: (state) => ({
          themeName: state.themeName,
          layout: state.layout,
          spriteData: state.spriteData,
          currentAnimationName: state.currentAnimationName,
          currentFrameIndex: state.currentFrameIndex,
          currentYIndex: state.currentSlice,
        }),
      }
    )
  )
);
