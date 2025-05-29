/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './styles.scss';
import EditorApp from './editor/EditorApp';
import '@fontsource-variable/roboto'; // Supports weights 100-900
import ThemeWrapper from './editor/themes/ThemeWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <EditorApp />
    </ThemeWrapper>
  </React.StrictMode>
);
