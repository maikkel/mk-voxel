// Assuming you have the JSON file loaded from a server or local source
import { SpriteData } from './types/SpriteData';

const loadSpriteData = async (filePath: string): Promise<SpriteData> => {
  const response = await fetch(filePath);
  const data = await response.json();

  // Return the parsed data in the structure you need
  return {
    palette: data.palette,
    frameTime: data.frameTime,
    frames: data.frames.map((frame: any) => ({
      time: frame.time,
      colors: frame.colors,
    })),
  };
};

// Example usage:
loadSpriteData('/public/red_sphere_voxel_sprite.json').then((spriteData) => {
  console.log(spriteData);
});
