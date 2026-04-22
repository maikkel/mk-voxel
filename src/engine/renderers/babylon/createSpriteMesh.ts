import { Color3, Mesh, Scene, StandardMaterial, VertexData } from '@babylonjs/core';

export function createSpriteMesh(
  scene: Scene,
  vertexData: VertexData,
  parent: Mesh,
  name = 'spriteMesh',
): Mesh {
  const mesh = new Mesh(name, scene);
  mesh.parent = parent;
  vertexData.applyToMesh(mesh);
  return mesh;
}

export function createSpriteMaterial(scene: Scene, name = 'spriteMat'): StandardMaterial {
  const material = new StandardMaterial(name, scene);
  material.diffuseColor = Color3.White();
  material.backFaceCulling = false;
  return material;
}
