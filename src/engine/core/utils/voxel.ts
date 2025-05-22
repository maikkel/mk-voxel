import type { AnimationKey, MaterialKey, SpriteData } from '../../types/SpriteData';

/**
 * @internal
 * Runtime fast mutable version
 */
export function setVoxel(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  x: number,
  y: number,
  z: number,
  materialKey: MaterialKey | null
) {
  const animation = sprite.animations[animationKey];
  if (!animation) throw new Error(`Animation "${animationKey}" not found.`);
  const frame = animation.frames[frameIndex];
  if (!frame) throw new Error(`Frame index ${frameIndex} out of range.`);
  if (frame.voxels[x]?.[y]?.[z] === undefined) {
    throw new Error(`Voxel coordinate (${x}, ${y}, ${z}) out of bounds.`);
  }

  frame.voxels[x][y][z] = materialKey;
}
