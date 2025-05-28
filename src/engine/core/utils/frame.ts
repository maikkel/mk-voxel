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
//
// export function duplicateFrame(
//   sprite: SpriteData,
//   animationKey: AnimationKey,
//   pos: number,
//   insertAfter: boolean = true
// ) {
//   const animation = sprite.animations[animationKey];
//   if (!animation) error(`Animation '${animationKey}' not found`);
//
//   const original = animation.frames[pos];
//   if (!original) error(`Frame index ${pos} out of range`);
//   console.log('ov', original.voxels);
//
//   // 👇 Replace behavior: use resize-like "new" assignment
//   const voxels = new Uint8Array(original.voxels.length);
//   voxels.set(original.voxels);
//   const copy: Frame = {
//     voxels,
//     time: original.time,
//   };
//
//   animation.frames.splice(insertAfter ? pos + 1 : pos, 0, copy);
// }

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
