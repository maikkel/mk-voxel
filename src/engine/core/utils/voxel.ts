import type { AnimationKey, MaterialKey, SpriteData } from '../../types/SpriteData';

/**
 * @internal
 * Editor-safe immutable version
 */
export function editorSetVoxel(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  x: number,
  y: number,
  z: number,
  materialKey: MaterialKey | null
): SpriteData {
  const animation = sprite.animations[animationKey];
  if (!animation) throw new Error(`Animation "${animationKey}" not found.`);
  if (!animation.frames[frameIndex]) throw new Error(`Frame index ${frameIndex} out of range.`);

  const frame = animation.frames[frameIndex];
  const voxels = frame.voxels.map((layer) => layer.map((row) => [...row]));

  voxels[x][y][z] = materialKey;

  return {
    ...sprite,
    animations: {
      ...sprite.animations,
      [animationKey]: {
        ...animation,
        frames: [
          ...animation.frames.slice(0, frameIndex),
          {
            ...frame,
            voxels,
          },
          ...animation.frames.slice(frameIndex + 1),
        ],
      },
    },
  };
}

/**
 * @internal
 * Runtime fast mutable version
 */
export function gameSetVoxel(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  x: number,
  y: number,
  z: number,
  materialKey: MaterialKey | null
): SpriteData {
  const animation = sprite.animations[animationKey];
  if (!animation) throw new Error(`Animation "${animationKey}" not found.`);
  if (!animation.frames[frameIndex]) throw new Error(`Frame index ${frameIndex} out of range.`);

  const frame = animation.frames[frameIndex];
  frame.voxels[x][y][z] = materialKey;

  return sprite;
}
