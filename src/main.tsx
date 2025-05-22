import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import './styles.scss';
import EditorApp from './editor/EditorApp';
// Supports weights 100-900
import '@fontsource-variable/roboto';
import { ThemeWrapper } from './editor/themes/ThemeWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <EditorApp />
    </ThemeWrapper>
  </React.StrictMode>
);
