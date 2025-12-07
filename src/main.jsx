import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { RouterProvider } from "react-router-dom";
import { router } from './route/router.jsx';
import './index.css';
import { RouterProvider } from 'react-router';
import AuthProvider from './providers/AuthProviders.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
        <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>
);
