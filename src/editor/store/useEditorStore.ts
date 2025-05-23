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
import { themeBlack, themeBlue } from '../themes/themes';

type ThemeName = 'blue' | 'black';
export type LayoutType = 'vertical' | 'horizontal' | 'auto';

const themeMap: Record<ThemeName, MantineThemeOverride> = {
  blue: themeBlue,
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

  currentYIndex: number;
  setCurrentYIndex: (index: number) => void;
}

export const useEditorStore = create<EditorStore>()(
  immer(
    persist(
      (set) => ({
        themeName: 'blue',
        setThemeName: (name) => set({ themeName: name, currentTheme: themeMap[name] }),
        currentTheme: themeMap['blue'],
        layout: 'auto',
        setLayout: (layout) => set({ layout: layout }),

        spriteData: initialSpriteData,
        setSpriteData: (data: SpriteData) => set({ spriteData: data }),

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

        currentYIndex: 0,
        setCurrentYIndex: (index) => set({ currentYIndex: index }),
      }),
      {
        name: 'editor-store', // 🔑 localStorage key
        partialize: (state) => ({
          spriteData: state.spriteData,
          currentAnimationName: state.currentAnimationName,
          currentFrameIndex: state.currentFrameIndex,
          currentYIndex: state.currentYIndex,
        }),
      }
    )
  )
);
