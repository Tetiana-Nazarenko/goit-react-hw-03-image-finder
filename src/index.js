import React from 'react';
import ReactDOM from 'react-dom/client';
import ImageApp from './components/App';
import './index.css';

const root =
  //document.getElementById('root');
  ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImageApp />
  </React.StrictMode>
);
