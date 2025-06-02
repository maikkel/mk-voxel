import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { AnimationKey, Frame, Material, Palette, SpriteData } from '../types/SpriteData';

export class SpriteRendererBabylon {
  private scene: Scene;
  private spriteData: SpriteData;
  private meshParent: Mesh;
  private cubes: Mesh[] = [];
  private materials: Map<number, StandardMaterial> = new Map();
  private currentAnimationKey?: AnimationKey;
  private animationFrameIndex = 0;
  private animationTimer = 0;
  private isPlaying = false;

  constructor(scene: Scene, spriteData: SpriteData) {
    this.scene = scene;
    this.spriteData = spriteData;

    this.meshParent = new Mesh('spriteParent', this.scene);
    this.createMaterials();
    this.updateMesh(spriteData.animations[Object.keys(spriteData.animations)[0]].frames[0]); // init first frame
  }

  setSpriteData(newSpriteData: SpriteData) {
    this.spriteData = newSpriteData;
  }

  updateMesh(
    frame: Frame = this.spriteData.animations[Object.keys(this.spriteData.animations)[0]].frames[0]
  ) {
    console.log('updateMesh');
    // Clean old cubes
    this.cubes.forEach((cube) => cube.dispose());
    this.cubes = [];

    const dims = this.spriteData.dimensions;
    const size = 1;

    console.log(dims);

    for (let i = 0; i < frame.voxels.length; i++) {
      const materialIndex = frame.voxels[i];
      if (materialIndex !== 0) {
        const cube = MeshBuilder.CreateBox(`cube_${i}`, { size }, this.scene);

        const xi = i % dims.x;
        const yi = Math.floor(i / dims.x) % dims.y;
        const zi = Math.floor(i / (dims.x * dims.y));

        const centerX = (dims.x - 1) / 2;
        const centerY = (dims.y - 1) / 2;
        const centerZ = (dims.z - 1) / 2;

        cube.position = new Vector3(
          (xi - centerX) * size, // X stays X
          (yi - centerY) * size, // Y stays Y
          -(zi - centerZ) * size // Flip Z
        );

        cube.material = this.materials.get(materialIndex) ?? null;
        cube.parent = this.meshParent;
        this.cubes.push(cube);
      }
    }
  }

  updateMaterials(palette: Palette = this.spriteData.palette) {
    console.log('updateMaterials');
    console.log(palette);

    for (const [indexStr, matDef] of Object.entries(palette)) {
      const index = Number(indexStr);

      let material = this.materials.get(index);

      if (!material) {
        material = new StandardMaterial(`mat${index}`, this.scene);
        this.materials.set(index, material);
      }

      if (matDef.color) {
        material.diffuseColor = Color3.FromHexString(matDef.color);
      }
    }
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
      const frame = anim.frames[this.animationFrameIndex];
      this.updateMesh(frame);
    }
  }

  cleanup() {
    this.cubes.forEach((cube) => cube.dispose());
    this.meshParent.dispose();
    this.materials.forEach((mat) => mat.dispose());
    this.materials.clear();
  }

  private createMaterials() {
    Object.entries(this.spriteData.palette).forEach(([index, material]) => {
      const mat = material as Material; // Cast each material individually
      if (mat.color) {
        const babylonMaterial = new StandardMaterial(`mat${index}`, this.scene);
        babylonMaterial.diffuseColor = Color3.FromHexString(mat.color);
        this.materials.set(Number(index), babylonMaterial);
      }
    });
  }
}
