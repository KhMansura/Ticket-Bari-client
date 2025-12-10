// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// // import { RouterProvider } from "react-router-dom";
// import { router } from './route/router.jsx';
// import './index.css';
// import { RouterProvider } from 'react-router';
// import AuthProvider from './providers/AuthProviders.jsx';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//      <AuthProvider>
//         <RouterProvider router={router} />
//      </AuthProvider>
//   </StrictMode>
// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './route/router.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom'; // Check: usually better to import from 'react-router-dom'
import AuthProvider from './providers/AuthProviders.jsx';

// 1. IMPORT REACT QUERY
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. CREATE THE CLIENT
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
        {/* 3. WRAP YOUR APP WITH THE PROVIDER */}
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
     </AuthProvider>
  </StrictMode>
);