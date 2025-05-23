import { type Dimensions, type MaterialIndex } from '../../types/SpriteData';

export function createFrame(dims: Dimensions, fill: MaterialIndex = 0): Uint8Array {
  return new Uint8Array(dims.x * dims.y * dims.z).fill(fill);
}
