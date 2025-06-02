import { Animation, AnimationKey, type Dimensions, SpriteData } from '../../types/SpriteData';
import { createFrame, nudgeFrame } from './frame';
import { error } from './log';

export function createAnimation(dims: Dimensions, name: string): Animation {
  return {
    name: name,
    frameTime: 100,
    frames: [createFrame(dims)],
  };
}

export function renameAnimation(
  sprite: SpriteData,
  oldKey: AnimationKey,
  newKey: AnimationKey
): void {
  if (!sprite.animations[oldKey]) {
    error(`Animation key "${oldKey}" does not exist.`);
    return;
  }
  if (sprite.animations[newKey]) {
    error(`Animation key "${newKey}" already exists.`);
    return;
  }

  const animation = sprite.animations[oldKey];
  animation.name = newKey;
  sprite.animations[newKey] = animation;
  delete sprite.animations[oldKey];
}

export function nudgeAnimation(
  sprite: SpriteData,
  animationKey: AnimationKey,
  dx: number,
  dy: number,
  dz: number
) {
  const animation = sprite.animations[animationKey];
  if (!animation) error(`Animation '${animationKey}' not found`);

  const dims = sprite.dimensions;

  for (const frame of animation.frames) {
    nudgeFrame(frame, dims, dx, dy, dz);
  }
}
