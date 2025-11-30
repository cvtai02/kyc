import './App.css';
import {
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import QueryClient from './base/query-client';



function App() {
  return (
    <QueryClientProvider client={QueryClient}>
      <RouterProvider router={createBrowserRouter(createRoutesFromElements(AppRoutes))} />
    </QueryClientProvider>
  );
}

export default App;