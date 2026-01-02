import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { WorthProvider } from '@/components/worth/WorthProvider';
import router from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <WorthProvider>
    <RouterProvider router={router} />
  </WorthProvider>,
);
