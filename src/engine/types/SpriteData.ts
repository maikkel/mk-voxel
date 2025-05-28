export type MaterialIndex = number; // 0–255
export type AnimationKey = string;
export type SpriteId = number;

export interface Material {
  color: string | null; // "#ff00cc"
  name?: string;
  glow?: boolean;
}

export type Palette = Record<MaterialIndex, Material>; // index = MaterialIndex

export interface AnimationList {
  [key: AnimationKey]: Animation;
}

export interface Animation {
  name: string;
  frames: Frame[];
  frameTime?: number;
}

export interface Frame {
  time?: number;
  voxels: Uint8Array; // length = x * y * z
}

export interface Dimensions {
  x: number;
  y: number;
  z: number;
}

export interface SpriteData {
  id?: SpriteId;
  name: string;
  palette: Palette;
  dimensions: Dimensions;
  frameTime: number;
  animations: AnimationList;
}
