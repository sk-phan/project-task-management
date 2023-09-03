import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux'
import {  createBrowserRouter, 
          RouterProvider } from 'react-router-dom';   
import SignupView from './views/SignupView';
import ProjectView from './views/ProjectView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <SignupView />
  },
  {
    path: "/projects",
    element: <ProjectView />
  }
])          


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

