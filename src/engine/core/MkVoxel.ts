import {
  AnimationKey,
  Dimensions,
  type MaterialIndex,
  SpriteData,
  SpriteId,
} from '../types/SpriteData';
import { createSprite, resizeFrameVoxels } from './utils/sprite';
import { setVoxel } from './utils/voxel';
import { log } from './utils/log';

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
