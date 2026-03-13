import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { WorthProvider } from '@/components/worth/WorthProvider';
import router from './router';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { CodeProvider } from '@/components/utils/CodeProvider';

const pages = import.meta.glob('../src/pages/**/*.(ts|tsx|sh)', {
  as: 'raw',
});

const modules = {
  ...pages,
};
const snippets: { [key: string]: string } = {};

export const loadCodeSnippets = async () => {
  const promises: Promise<void>[] = [];

  for (const [key, value] of Object.entries(modules)) {
    promises.push(
      new Promise(async (resolve) => {
        (snippets[key] = await value()), resolve();
      })
    );
  }

  await Promise.all(promises);
  return snippets;
};

createRoot(document.getElementById('root')!).render(
  <WorthProvider>
    <SnackbarProvider>
      <CodeProvider loadCodeSnippets={loadCodeSnippets}>
        <RouterProvider router={router} />
      </CodeProvider>
    </SnackbarProvider>
  </WorthProvider>,
);
