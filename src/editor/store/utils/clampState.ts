import type { EditorStore } from '../useEditorStore';

export function clampState(state: EditorStore): Partial<EditorStore> {
  const {
    spriteData,
    currentAnimationKey,
    currentFrameIndex,
    currentSliceIndex,
    currentMaterialIndex,
  } = state;

  const animations = spriteData.animations;
  const animKeys = Object.keys(animations);
  const newAnimKey = animKeys.includes(currentAnimationKey)
    ? currentAnimationKey
    : (animKeys[0] ?? '');

  const frames = animations[newAnimKey]?.frames ?? [];
  const newFrameIndex = Math.min(currentFrameIndex, frames.length - 1);

  const newSliceIndex = Math.min(currentSliceIndex, spriteData.dimensions.y - 1);

  const paletteKeys = Object.keys(spriteData.palette).map(Number);
  const newMaterialIndex = paletteKeys.includes(currentMaterialIndex)
    ? currentMaterialIndex
    : (paletteKeys[0] ?? 0);

  return {
    currentAnimationKey: newAnimKey,
    currentFrameIndex: Math.max(0, newFrameIndex),
    currentSliceIndex: Math.max(0, newSliceIndex),
    currentMaterialIndex: newMaterialIndex,
  };
}
