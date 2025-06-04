import * as BABYLON from '@babylonjs/core';
import { AxesViewer, Vector3 } from '@babylonjs/core';
import { SpriteRendererBabylon } from '../../engine/renderers/SpriteRendererBabylon';
import { SceneInstrumentation } from '@babylonjs/core/Instrumentation/sceneInstrumentation';
import { useEditorStore } from '../store/useEditorStore';
import { attachRenderer } from './rendererNotifier';

export function initViewScene(canvas: HTMLCanvasElement): BABYLON.Scene {
  const engine = new BABYLON.Engine(canvas, true, undefined, true);
  const scene = new BABYLON.Scene(engine);

  const instrumentation = new SceneInstrumentation(scene);

  const debugUi = document.getElementById('babylon-debug-ui')!;
  const fpsUi = document.getElementById('babylon-fps-ui')!;

  setInterval(() => {
    fpsUi.innerText = `FPS: ${engine.getFps().toFixed(1)}\n`;
  }, 1000);
  setInterval(() => {
    debugUi.innerText =
      `Draw Calls: ${instrumentation.drawCallsCounter.current}\n` +
      `Vertices: ${scene.getTotalVertices()}\n` +
      `Faces: ${(scene.getActiveIndices() / 3) | 0}\n` +
      `Meshes: ${scene.getActiveMeshes().length | 0}`;
  }, 1000);

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
  const spriteData = useEditorStore.getState().spriteData;

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
    15,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

  const sprite = new SpriteRendererBabylon(scene, spriteData);
  attachRenderer(sprite);

  // Inside your `initViewScene` after creating scene/camera:
  const axes = new AxesViewer(scene, 2); // 2 = size of the axes

  const dims = spriteData.dimensions;
  // Position offset: e.g., move slightly to the side of your sprite

  console.log('dims', spriteData.dimensions);
  console.log(-dims.x / 2 - 1, -dims.y / 2 - 1, -dims.z / 2 - 1);
  const offset = new Vector3(-dims.x / 2 - 1, -dims.y / 2 - 1, -dims.z / 2 - 1); // adjust as needed
  axes.xAxis.position = offset;
  axes.yAxis.position = offset;
  axes.zAxis.position = offset;

  // Render loop
  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return scene;
}
