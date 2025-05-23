import type { AnimationKey, Dimensions, MaterialIndex, SpriteData } from '../../types/SpriteData';
import { error } from './log';

export function getVoxelIndex(x: number, y: number, z: number, dims: Dimensions): number {
  return x + y * dims.x + z * dims.x * dims.y;
}

export function getVoxel(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  x: number,
  y: number,
  z: number
): MaterialIndex {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation "${animationKey}" not found.`);
  const frame = animation.frames[frameIndex];
  if (!frame) error(`Frame index ${frameIndex} out of range.`);

  const { dimensions } = sprite;
  if (x < 0 || x >= dimensions.x || y < 0 || y >= dimensions.y || z < 0 || z >= dimensions.z) {
    error(`Voxel coordinate (${x}, ${y}, ${z}) out of bounds.`);
  }

  const index = getVoxelIndex(x, y, z, dimensions);
  return frame.voxels[index];
}

export function setVoxel(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  x: number,
  y: number,
  z: number,
  materialIndex: MaterialIndex
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation "${animationKey}" not found.`);
  const frame = animation.frames[frameIndex];
  if (!frame) error(`Frame index ${frameIndex} out of range.`);

  const { dimensions } = sprite;
  if (x < 0 || x >= dimensions.x || y < 0 || y >= dimensions.y || z < 0 || z >= dimensions.z) {
    error(`Voxel coordinate (${x}, ${y}, ${z}) out of bounds.`);
  }

  if (!sprite.palette[materialIndex]) {
    error(`Material index ${materialIndex} is not defined in the palette.`);
  }

  if (materialIndex < 0 || materialIndex > 255) {
    error(`Material index ${materialIndex} is out of valid range (0–255).`);
  }

  const index = getVoxelIndex(x, y, z, dimensions);
  frame.voxels[index] = materialIndex;
}
