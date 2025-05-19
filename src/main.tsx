import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // ✅ Correct place
import 'mantine-contextmenu/styles.layer.css';
import './styles.scss';
import { ContextMenuProvider } from 'mantine-contextmenu';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <ContextMenuProvider>
        <App />
      </ContextMenuProvider>
    </MantineProvider>
  </React.StrictMode>
);
