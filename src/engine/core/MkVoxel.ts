import { AnimationKey, Dimensions, MaterialKey, SpriteData, SpriteId } from '../types/SpriteData';
import { createEmptySprite, resizeFrameVoxels } from './utils/sprite';
import { setVoxel } from './utils/voxel';

export enum EngineMode {
  EDITOR = 'editor',
  GAME = 'game',
}

export class MkVoxel {
  private sprites: Map<SpriteId, SpriteData> = new Map();
  private nextSpriteId = 1;

  constructor() {
    console.info(`MkVoxel initialized.`);
  }

  createSprite(
    x: number,
    y: number,
    z: number,
    name: string,
    defaultAnimationName = 'default'
  ): SpriteData {
    const id = this.nextSpriteId++ as SpriteId;
    const sprite = createEmptySprite(id, name, x, y, z, defaultAnimationName);
    this.sprites.set(id, sprite);
    return sprite;
  }

  getSprite(id: SpriteId): SpriteData | undefined {
    return this.sprites.get(id);
  }

  resizeSprite(sprite: SpriteData, newDims: Dimensions): void {
    sprite.dimensions = newDims;

    for (const animation of Object.values(sprite.animations)) {
      for (const frame of animation.frames) {
        frame.voxels = resizeFrameVoxels(frame.voxels, newDims.x, newDims.y, newDims.z);
      }
    }
  }

  setVoxel(
    sprite: SpriteData,
    animationKey: AnimationKey,
    frameIndex: number,
    x: number,
    y: number,
    z: number,
    materialKey: MaterialKey | null
  ) {
    setVoxel(sprite, animationKey, frameIndex, x, y, z, materialKey);
  }
}
