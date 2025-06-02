import {
  type AnimationKey,
  type Dimensions,
  type Frame,
  type MaterialIndex,
  type SpriteData,
} from '../../types/SpriteData';
import { error } from './log';

export function createFrame(dims: Dimensions, fill: MaterialIndex = 0): Frame {
  return { voxels: new Uint8Array(dims.x * dims.y * dims.z).fill(fill) };
}

export function addFrame(
  sprite: SpriteData,
  animationKey: AnimationKey,
  fill: MaterialIndex = 0,
  pos?: number,
  rawVoxelData?: Uint8Array
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation '${animationKey}' not found`);

  const newFrame: Frame = {
    voxels: rawVoxelData
      ? new Uint8Array(rawVoxelData) // deep copy if provided
      : new Uint8Array(sprite.dimensions.x * sprite.dimensions.y * sprite.dimensions.z).fill(fill),
  };

  const len = animation.frames.length;
  if (pos !== undefined) {
    if (pos < 0 || pos > len) {
      error(`Invalid frame position: ${pos}`);
    }
    animation.frames.splice(pos, 0, newFrame);
  } else {
    animation.frames.push(newFrame);
  }
}

export function deleteFrame(sprite: SpriteData, animationKey: AnimationKey, pos: number) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation '${animationKey}' not found`);

  if (pos < 0 || pos >= animation.frames.length) {
    error(`Frame index ${pos} out of range`);
  }

  animation.frames.splice(pos, 1);
}

export function duplicateFrame(
  sprite: SpriteData,
  animationKey: AnimationKey,
  pos: number,
  insertAfter: boolean = true
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation '${animationKey}' not found`);

  const original = animation.frames[pos];
  if (!original) error(`Frame index ${pos} out of range`);

  // 👇 Replace behavior: use resize-like "new" assignment
  const voxels = new Uint8Array(original.voxels.length);
  voxels.set(original.voxels);
  const copy: Frame = {
    voxels,
    time: original.time,
  };

  animation.frames.splice(insertAfter ? pos + 1 : pos, 0, copy);
}

export function setFrameTime(
  sprite: SpriteData,
  animationKey: AnimationKey,
  frameIndex: number,
  time: number
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation "${animationKey}" not found.`);
  const frame = animation.frames[frameIndex];
  if (!frame) error(`Frame index ${frameIndex} out of range.`);

  frame.time = time;
}

export function nudgeFrame(frame: Frame, dims: Dimensions, dx: number, dy: number, dz: number) {
  const { x: sizeX, y: sizeY, z: sizeZ } = dims;
  const newVoxels = new Uint8Array(sizeX * sizeY * sizeZ);

  const getIndex = (x: number, y: number, z: number) => x + y * sizeX + z * sizeX * sizeY;

  for (let z = 0; z < sizeZ; z++) {
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        const sourceX = (x - dx + sizeX) % sizeX;
        const sourceY = (y - dy + sizeY) % sizeY;
        const sourceZ = (z - dz + sizeZ) % sizeZ;

        const srcIndex = getIndex(sourceX, sourceY, sourceZ);
        const destIndex = getIndex(x, y, z);
        newVoxels[destIndex] = frame.voxels[srcIndex];
      }
    }
  }

  frame.voxels = newVoxels; // replace the frame voxels
}
