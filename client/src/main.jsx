// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css'; // Import Tailwind CSS
import ReactGA from 'react-ga4';

ReactGA.initialize('G-8BLZ5B7RL0');
ReactGA.send('pageview');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
