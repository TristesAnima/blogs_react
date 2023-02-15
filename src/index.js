import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Suspense
      fallback={<>loading....</>}
    >
      <App />
    </Suspense>
  </Router>
);
