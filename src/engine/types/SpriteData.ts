export type MaterialKey = string; // e.g. "r", "g", "b"
export type AnimationKey = string; // e.g. "walk", "idle"
export type SpriteId = number;

export interface Material {
  color: string; // "#ff00cc"
  glow?: boolean;
}

export interface Palette {
  [key: MaterialKey]: Material;
}

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
  voxels: (MaterialKey | null)[][][];
}

export interface Dimensions {
  x: number;
  y: number;
  z: number;
}

export interface SpriteData {
  id: SpriteId;
  name: string;
  palette: Palette;
  dimensions: Dimensions;
  frameTime: number;
  animations: AnimationList;
}
