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
import { addFrame, deleteFrame, duplicateFrame, setFrameTime } from './utils/frame';

export class MkVoxel {
  private sprites: Map<SpriteId, SpriteData> = new Map();
  private nextSpriteId = 1;

  constructor() {
    log(`MkVoxel initialized.`);
  }

  createSprite(dims: Dimensions, name: string, defaultAnimationName = 'default'): SpriteData {
    return createSprite(name, dims, defaultAnimationName);
  }

  addSprite(sprite: SpriteData) {
    const id = this.nextSpriteId++ as SpriteId;
    sprite.id = id;
    this.sprites.set(id, sprite);
  }

  getSprite(id: SpriteId): SpriteData | undefined {
    return this.sprites.get(id);
  }

  resizeSprite(sprite: SpriteData, newDims: Dimensions): void {
    console.log('resizeSprite', sprite, newDims);
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

  addFrame(sprite: SpriteData, animationKey: AnimationKey, fill: MaterialIndex = 0, pos?: number) {
    addFrame(sprite, animationKey, fill, pos);
  }

  duplicateFrame(
    sprite: SpriteData,
    animationKey: AnimationKey,
    pos: number,
    insertAfter: boolean = true
  ) {
    duplicateFrame(sprite, animationKey, pos, insertAfter);
  }

  deleteFrame(sprite: SpriteData, animationKey: AnimationKey, pos: number): void {
    deleteFrame(sprite, animationKey, pos);
  }

  setFrameTime(sprite: SpriteData, animationKey: AnimationKey, frameIndex: number, time: number) {
    setFrameTime(sprite, animationKey, frameIndex, time);
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
