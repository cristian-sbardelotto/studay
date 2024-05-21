import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { HomeworksContext } from './contexts/homeworks.ts';
import './index.css';

import { homeworksMock } from '@/data/homeworks-mock';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomeworksContext.Provider value={homeworksMock}>
      <App />
    </HomeworksContext.Provider>
  </React.StrictMode>
);
