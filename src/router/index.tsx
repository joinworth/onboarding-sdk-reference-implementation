import type { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import PrefillForm from '../pages/PrefillForm';
import Landing from '../pages/Landing';
import Onboarding from '../pages/Onboarding';
import DemoFlows from '../pages/DemoFlows';

const routes: RouteObject[] = [
  {
    Component: App,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/product',
        element: <div>Product</div>,
      },
      {
        path: '/prefill-form',
        element: <PrefillForm />,
      },
      {
        path: '/docs',
        element: <div>Docs</div>,
      },
      {
        path: '/onboarding',
        element: <Onboarding />,
      },
      {
        path: '/demo-flows',
        element: <DemoFlows />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
