import { Palette } from '../../types/SpriteData';

export function createBasePalette(): Palette {
  return {
    0: { color: null, name: 'EMPTY' },
    1: { color: '#ff0000', name: 'red' },
    2: { color: '#00ff00', name: 'green' },
    3: { color: '#0000ff', name: 'blue' },
    4: { color: '#ffffff', name: 'white' },
    5: { color: '#000000', name: 'black' },
  };
}
