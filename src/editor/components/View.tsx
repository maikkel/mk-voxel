import { useEffect, useRef } from 'react';
import { initViewScene } from '../utils/initViewScene';
import { AbstractEngine } from '@babylonjs/core';

export default function View() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AbstractEngine | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const scene = initViewScene(canvasRef.current);
      engineRef.current = scene.getEngine();

      const observer = new ResizeObserver(() => {
        engineRef.current?.resize();
      });
      observer.observe(canvasRef.current);

      return () => {
        engineRef.current?.dispose();
        observer.disconnect();
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
