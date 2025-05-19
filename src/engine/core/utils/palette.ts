import { Palette } from '../../types/SpriteData';

export function createBasePalette(): Palette {
  return {
    r: { color: '#ff0000' },
    g: { color: '#00ff00' },
    b: { color: '#0000ff' },
    w: { color: '#ffffff' },
  };
}
