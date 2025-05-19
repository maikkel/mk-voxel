import { AnimationKey, Dimensions, MaterialKey, SpriteData, SpriteId } from '../types/SpriteData';
import { createEmptySprite, resizeFrameVoxels } from './utils/sprite';
import { mapObjectValues } from './utils/common';
import { editorSetVoxel, gameSetVoxel } from './utils/voxel';

export enum EngineMode {
  EDITOR = 'editor',
  GAME = 'game',
}

export class MkVoxel {
  private sprites: Map<SpriteId, SpriteData> = new Map();
  private nextSpriteId = 1;
  private mode: EngineMode = EngineMode.EDITOR;

  constructor(mode: EngineMode = EngineMode.EDITOR) {
    this.setMode(mode);
    console.info(`MkVoxel initialized in ${mode} mode.`);
  }

  setMode(mode: EngineMode) {
    this.mode = mode;
  }

  getMode(): EngineMode {
    return this.mode;
  }

  isEditorMode() {
    return this.mode === EngineMode.EDITOR;
  }

  isGameMode() {
    return this.mode === EngineMode.GAME;
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

  resizeSprite(sprite: SpriteData, newDims: Dimensions): SpriteData {
    return {
      ...sprite,
      dimensions: newDims,
      animations: mapObjectValues(sprite.animations, (animation) => ({
        ...animation,
        frames: animation.frames.map((frame) => ({
          ...frame,
          voxels: resizeFrameVoxels(frame.voxels, newDims.x, newDims.y, newDims.z),
        })),
      })),
    };
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
    if (this.isEditorMode()) {
      return editorSetVoxel(sprite, animationKey, frameIndex, x, y, z, materialKey);
    } else {
      return gameSetVoxel(sprite, animationKey, frameIndex, x, y, z, materialKey);
    }
  }
}
