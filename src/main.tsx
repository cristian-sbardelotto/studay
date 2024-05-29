import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/App';
import { Toaster } from '@/components/ui/sonner';
import { HomeworksContextProvider } from './providers/homeworks';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomeworksContextProvider>
      <App />

      <Toaster />
    </HomeworksContextProvider>
  </React.StrictMode>
);
