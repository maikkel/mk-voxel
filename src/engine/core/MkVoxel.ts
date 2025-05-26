import {
  AnimationKey,
  Dimensions,
  type MaterialIndex,
  SpriteData,
  SpriteId,
} from '../types/SpriteData';
import { createSprite, resizeFrameVoxels } from './utils/sprite';
import { setVoxel } from './utils/voxel';
import { error, log } from './utils/log';
import { createAnimation, renameAnimation } from './utils/animation';

export class MkVoxel {
  private sprites: Map<SpriteId, SpriteData> = new Map();
  private nextSpriteId = 1;

  constructor() {
    log(`MkVoxel initialized.`);
  }

  createSprite(dims: Dimensions, name: string, defaultAnimationName = 'default'): SpriteData {
    const id = this.nextSpriteId++ as SpriteId;
    const sprite = createSprite(id, name, dims, defaultAnimationName);
    this.sprites.set(id, sprite);
    return sprite;
  }

  getSprite(id: SpriteId): SpriteData | undefined {
    return this.sprites.get(id);
  }

  resizeSprite(sprite: SpriteData, newDims: Dimensions): void {
    for (const animation of Object.values(sprite.animations)) {
      for (const frame of animation.frames) {
        frame.voxels = resizeFrameVoxels(frame.voxels, sprite.dimensions, newDims);
      }
    }

    sprite.dimensions = newDims;
  }

  addAnimation(sprite: SpriteData, name: AnimationKey): void {
    if (sprite.animations[name]) {
      error(`Animation key "${name}" already exists in sprite ${sprite.id}.`);
    }
    sprite.animations[name] = createAnimation(sprite.dimensions, name);
  }

  removeAnimation(sprite: SpriteData, name: AnimationKey): void {
    if (!sprite.animations[name]) {
      error(`Animation key "${name}" does not exist in sprite ${sprite.id}.`);
    }
    delete sprite.animations[name];
  }

  renameAnimation(sprite: SpriteData, oldKey: AnimationKey, newKey: AnimationKey): void {
    renameAnimation(sprite, oldKey, newKey);
  }

  setVoxel(
    sprite: SpriteData,
    animationKey: AnimationKey,
    frameIndex: number,
    x: number,
    y: number,
    z: number,
    materialIndex: MaterialIndex
  ) {
    setVoxel(sprite, animationKey, frameIndex, x, y, z, materialIndex);
  }
}
