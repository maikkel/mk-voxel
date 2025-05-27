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
  pos?: number
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation '${animationKey}' not found`);

  const newFrame: Frame = createFrame(sprite.dimensions, fill);

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
