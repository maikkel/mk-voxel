import type { Dimensions, Frame, Palette } from '../../engine/types/SpriteData';

export function drawSlicePreview(
  canvas: HTMLCanvasElement | null,
  dimensions: Dimensions,
  frame: Frame,
  sliceY: number,
  palette: Palette,
  scale: number = 2
) {
  if (!canvas) return;

  const { x: w, y: h, z: d } = dimensions;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;

  // Set canvas size based on voxel grid * devicePixelRatio
  canvas.width = w * scale * dpr;
  canvas.height = d * scale * dpr;
  canvas.style.width = `${w * scale}px`;
  canvas.style.height = `${d * scale}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  for (let z = 0; z < d; z++) {
    for (let x = 0; x < w; x++) {
      const index = x + sliceY * w + z * w * h;
      const material = frame.voxels[index];
      if (material === 0) continue;

      const color = palette[material]?.color ?? 'magenta';
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, z * scale, scale, scale);
    }
  }
}
