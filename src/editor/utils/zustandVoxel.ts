import { useEditorStore } from '../store/useEditorStore';

export function withVoxelChange(
  fn: (spriteData: ReturnType<typeof useEditorStore.getState>['spriteData']) => void
) {
  useEditorStore.setState((state) => {
    fn(state.spriteData); // run in-place mutation
    return { voxelVersion: state.voxelVersion + 1 }; // trigger reactivity
  });
}
