import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { WorthProvider } from '@/components/worth/WorthProvider';
import router from './router';
import './index.css';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <WorthProvider>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </WorthProvider>,
);
