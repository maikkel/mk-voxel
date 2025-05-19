import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dimensions, Palette, SpriteData } from '../../engine/types/SpriteData';
import { MkVoxel } from '../../engine/core/MkVoxel';

const engine = new MkVoxel();
const initialSpriteData = engine.createSprite(3, 3, 3, 'new_sprite');

interface EditorStore {
  spriteData: SpriteData | null;
  setSpriteData: (data: SpriteData) => void;
  updatePalette: (newPalette: Palette) => void;
  resizeSprite: (newDimensions: Dimensions) => void;

  currentAnimationName: string;
  setCurrentAnimationName: (name: string) => void;

  currentFrameIndex: number;
  setCurrentFrameIndex: (index: number) => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      spriteData: initialSpriteData,
      setSpriteData: (data: SpriteData) => set({ spriteData: data }),

      resizeSprite: (newDimensions: Dimensions) => {
        const current = get().spriteData;
        if (!current) return;
        const resized = engine.resizeSprite(current, newDimensions);
        set({ spriteData: resized });
      },

      updatePalette: (newPalette: Palette) => {
        const current = get().spriteData;
        if (!current) return;
        set({ spriteData: { ...current, palette: newPalette } });
      },

      currentAnimationName: Object.keys(initialSpriteData.animations)[0],
      setCurrentAnimationName: (name) => set({ currentAnimationName: name }),

      currentFrameIndex: 0,
      setCurrentFrameIndex: (index) => set({ currentFrameIndex: index }),
    }),
    {
      name: 'editor-store', // 🔑 localStorage key
      partialize: (state) => ({
        spriteData: state.spriteData,
        currentAnimationName: state.currentAnimationName,
        currentFrameIndex: state.currentFrameIndex,
      }),
    }
  )
);
