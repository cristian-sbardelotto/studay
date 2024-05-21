import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { HomeworksContextProvider } from './providers/homeworks';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomeworksContextProvider>
      <App />
    </HomeworksContextProvider>
  </React.StrictMode>
);
