import type { SpriteRendererBabylon } from '../../engine/renderers/SpriteRendererBabylon';
import type { SpriteData } from '../../engine/types/SpriteData';

const spriteRenderers = new Set<SpriteRendererBabylon>();

export function attachRenderer(renderer: SpriteRendererBabylon) {
  spriteRenderers.add(renderer);
}

export function detachRenderer(renderer: SpriteRendererBabylon) {
  spriteRenderers.delete(renderer);
}

export function notifyMeshUpdate() {
  spriteRenderers.forEach((r) => r.updateMesh());
}

export function notifyMaterialUpdate() {
  spriteRenderers.forEach((r) => r.updateMaterials());
}

// 🆕 New function:
export function notifySpriteDataUpdate(newSpriteData: SpriteData) {
  spriteRenderers.forEach((r) => r.setSpriteData(newSpriteData));
}
