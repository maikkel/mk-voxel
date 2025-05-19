import EditorApp from './editor/EditorApp';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault(); // Prevent the default context menu
    };

    // Add the event listener to the whole document
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <EditorApp />;
}
