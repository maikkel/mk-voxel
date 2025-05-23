import { Animation, type Dimensions } from '../../types/SpriteData';
import { createFrame } from './frame';

export function createAnimation(dims: Dimensions, name: string): Animation {
  return {
    name: name,
    frameTime: 100,
    frames: [{ voxels: createFrame(dims) }],
  };
}
