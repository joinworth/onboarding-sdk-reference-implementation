import type { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import Landing from '../pages/Landing';
import Onboarding from '../pages/Onboarding';
import DemoFlows from '../pages/DemoFlows';
import DemoFlowsOptions from '../components/demo-flows/DemoFlowsOptions';
import IdvQuickAdd from '../components/demo-flows/IdvQuickAdd';
import UseToken from '../components/demo-flows/UseToken';
import FullOnboarding from '../components/demo-flows/FullOnboarding';

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
        children: [
          { index: true, element: <DemoFlowsOptions /> },
          { path: 'idv-quick-add', element: <IdvQuickAdd /> },
          { path: 'use-token', element: <UseToken /> },
          { path: 'full-onboarding', element: <FullOnboarding /> },
        ]
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
