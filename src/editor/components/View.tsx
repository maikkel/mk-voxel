import { useEffect, useRef } from 'react';
import { initViewScene } from '../utils/initViewScene';
import { AbstractEngine } from '@babylonjs/core';
import styles from './view.module.scss';

export default function View() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AbstractEngine | null>(null);

  console.log('view');

  useEffect(() => {
    console.log('ef');
    if (canvasRef.current) {
      const scene = initViewScene(canvasRef.current);
      engineRef.current = scene.getEngine();
      return () => {
        engineRef.current?.dispose();
      };
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div id='babylon-fps-ui' className={styles.babylonFpsUi}>
        fps
      </div>
      <div id='babylon-debug-ui' className={styles.babylonDebugUi}>
        debug
      </div>
    </>
  );
}
