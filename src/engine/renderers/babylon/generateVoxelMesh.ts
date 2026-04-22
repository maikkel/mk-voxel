import { Color3, VertexData } from '@babylonjs/core';
import type { Dimensions, Frame, Palette } from '../../types/SpriteData';

// Face definitions: vertex offsets from voxel center (world space), outward normal,
// and the neighbor delta (in voxel space) that must be empty for this face to be visible.
// Z is flipped: world_z = -(voxel_z - center_z), so +Z world face = zi-1 neighbor.
// Winding follows Babylon.js left-hand convention (matches MeshBuilder.CreateBox).
const FACES = [
  {
    offsets: [[0.5,-0.5,-0.5],[0.5,0.5,-0.5],[0.5,0.5,0.5],[0.5,-0.5,0.5]] as const,
    normal: [1,0,0] as const, neighborDelta: [1,0,0] as const,
  },
  {
    offsets: [[-0.5,-0.5,0.5],[-0.5,0.5,0.5],[-0.5,0.5,-0.5],[-0.5,-0.5,-0.5]] as const,
    normal: [-1,0,0] as const, neighborDelta: [-1,0,0] as const,
  },
  {
    offsets: [[-0.5,0.5,-0.5],[0.5,0.5,-0.5],[0.5,0.5,0.5],[-0.5,0.5,0.5]] as const,
    normal: [0,1,0] as const, neighborDelta: [0,1,0] as const,
  },
  {
    offsets: [[-0.5,-0.5,0.5],[0.5,-0.5,0.5],[0.5,-0.5,-0.5],[-0.5,-0.5,-0.5]] as const,
    normal: [0,-1,0] as const, neighborDelta: [0,-1,0] as const,
  },
  { // world +Z face → voxel zi-1 must be empty
    offsets: [[0.5,-0.5,0.5],[-0.5,-0.5,0.5],[-0.5,0.5,0.5],[0.5,0.5,0.5]] as const,
    normal: [0,0,1] as const, neighborDelta: [0,0,-1] as const,
  },
  { // world -Z face → voxel zi+1 must be empty
    offsets: [[-0.5,-0.5,-0.5],[0.5,-0.5,-0.5],[0.5,0.5,-0.5],[-0.5,0.5,-0.5]] as const,
    normal: [0,0,-1] as const, neighborDelta: [0,0,1] as const,
  },
] as const;

export function generateVoxelMesh(frame: Frame, dims: Dimensions, palette: Palette): VertexData {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];

  const centerX = (dims.x - 1) / 2;
  const centerY = (dims.y - 1) / 2;
  const centerZ = (dims.z - 1) / 2;

  const voxelAt = (xi: number, yi: number, zi: number): number => {
    if (xi < 0 || xi >= dims.x || yi < 0 || yi >= dims.y || zi < 0 || zi >= dims.z) return 0;
    return frame.voxels[xi + yi * dims.x + zi * dims.x * dims.y];
  };

  let v = 0;

  for (let zi = 0; zi < dims.z; zi++) {
    for (let yi = 0; yi < dims.y; yi++) {
      for (let xi = 0; xi < dims.x; xi++) {
        const matIdx = voxelAt(xi, yi, zi);
        if (matIdx === 0) continue;

        const palMat = palette[matIdx];
        const col = palMat?.color ? Color3.FromHexString(palMat.color) : Color3.White();

        const wx = xi - centerX;
        const wy = yi - centerY;
        const wz = -(zi - centerZ);

        for (const { offsets, normal, neighborDelta } of FACES) {
          if (voxelAt(xi + neighborDelta[0], yi + neighborDelta[1], zi + neighborDelta[2]) !== 0) continue;

          for (const [ox, oy, oz] of offsets) {
            positions.push(wx + ox, wy + oy, wz + oz);
            normals.push(normal[0], normal[1], normal[2]);
            colors.push(col.r, col.g, col.b, 1);
          }

          indices.push(v, v + 1, v + 2, v, v + 2, v + 3);
          v += 4;
        }
      }
    }
  }

  const vd = new VertexData();
  vd.positions = positions;
  vd.normals = normals;
  vd.indices = indices;
  vd.colors = colors;
  return vd;
}
