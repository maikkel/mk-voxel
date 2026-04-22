import { Mesh, Scene, StandardMaterial } from '@babylonjs/core';
import { AnimationKey, Frame, Palette, SpriteData } from '../types/SpriteData';
import { createSpriteMaterial, createSpriteMesh } from './babylon/createSpriteMesh';
import { generateVoxelMesh } from './babylon/generateVoxelMesh';

export class SpriteRendererBabylon {
  private scene: Scene;
  private spriteData: SpriteData;
  private meshParent: Mesh;
  private spriteMesh: Mesh | null = null;
  private spriteMaterial: StandardMaterial;
  private currentFrame: Frame;
  private currentAnimationKey?: AnimationKey;
  private animationFrameIndex = 0;
  private animationTimer = 0;
  private isPlaying = false;

  constructor(scene: Scene, spriteData: SpriteData) {
    this.scene = scene;
    this.spriteData = spriteData;
    this.meshParent = new Mesh('spriteParent', this.scene);
    this.spriteMaterial = createSpriteMaterial(this.scene);

    const firstFrame = spriteData.animations[Object.keys(spriteData.animations)[0]].frames[0];
    this.currentFrame = firstFrame;
    this.updateMesh(firstFrame);
  }

  setSpriteData(newSpriteData: SpriteData) {
    this.spriteData = newSpriteData;
  }

  updateMesh(
    frame: Frame = this.spriteData.animations[Object.keys(this.spriteData.animations)[0]].frames[0],
  ) {
    this.currentFrame = frame;
    this.spriteMesh?.dispose();

    const vertexData = generateVoxelMesh(frame, this.spriteData.dimensions, this.spriteData.palette);
    this.spriteMesh = createSpriteMesh(this.scene, vertexData, this.meshParent);
    this.spriteMesh.material = this.spriteMaterial;
  }

  updateMaterials(palette: Palette = this.spriteData.palette) {
    this.spriteData = { ...this.spriteData, palette };
    this.updateMesh(this.currentFrame);
  }

  playAnimation(key: AnimationKey) {
    this.currentAnimationKey = key;
    this.animationFrameIndex = 0;
    this.animationTimer = 0;
    this.isPlaying = true;
  }

  stopAnimation() {
    this.isPlaying = false;
  }

  update(deltaTime: number) {
    if (!this.isPlaying || !this.currentAnimationKey) return;
    const anim = this.spriteData.animations[this.currentAnimationKey];
    if (!anim) return;

    this.animationTimer += deltaTime;
    if (this.animationTimer >= (anim.frameTime ?? this.spriteData.frameTime)) {
      this.animationTimer = 0;
      this.animationFrameIndex = (this.animationFrameIndex + 1) % anim.frames.length;
      this.updateMesh(anim.frames[this.animationFrameIndex]);
    }
  }

  cleanup() {
    this.spriteMesh?.dispose();
    this.meshParent.dispose();
    this.spriteMaterial.dispose();
  }
}
