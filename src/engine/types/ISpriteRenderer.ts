import type { AnimationKey, Frame, Palette, SpriteData } from './SpriteData';

export interface SpriteRenderer {
  init: (sprite: SpriteData) => void; // Bind to SpriteData
  updateMesh: (frame: Frame) => void; // Update mesh for a specific frame
  updateMaterials: (palette: Palette) => void; // Update materials
  playAnimation: (key: AnimationKey) => void; // Play animation
  stopAnimation: () => void; // Stop animation
  cleanup: () => void; // Dispose everything
}
