import * as BABYLON from '@babylonjs/core';

export function initViewScene(canvas: HTMLCanvasElement): BABYLON.Scene {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const observer = new ResizeObserver(() => {
    engine.resize();
    scene.render(); // optional: force render after resize to avoid flicker
  });

  if (canvas.parentElement) observer.observe(canvas.parentElement);

  // Camera
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    Math.PI / 4,
    Math.PI / 3,
    5,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

  // ✅ Debug Cube
  const box = BABYLON.MeshBuilder.CreateBox('debugCube', { size: 1 }, scene);
  box.position.y = 0.5;

  const mat = new BABYLON.StandardMaterial('boxMat', scene);
  mat.diffuseColor = new BABYLON.Color3(0.4, 0.7, 1); // Light blue
  box.material = mat;

  // Render loop
  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return scene;
}
