/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './styles.scss';
import EditorApp from './editor/EditorApp';
import '@fontsource-variable/roboto'; // Supports weights 100-900
import ThemeWrapper from './editor/themes/ThemeWrapper';

// if (import.meta.env.DEV) {
//   console.log('DEV MODE');
//   const whyDidYouRender = await import('@welldone-software/why-did-you-render');
//   whyDidYouRender.default(React, { trackAllPureComponents: true });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <EditorApp />
    </ThemeWrapper>
  </React.StrictMode>
);
