import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import fs from 'fs';
import path from 'path';

const keyPath = path.resolve(__dirname, './ssl/localhost.key');
const certPath = path.resolve(__dirname, './ssl/localhost.cert');

// Serve https when the local mkcert pair is present (get-started setup-ssl-certs.sh): SDK 3 calls
// integration-service, which rejects http:// origins.
let https: undefined | { key: string; cert: string };
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  https = {
    key: fs.readFileSync(keyPath, 'utf8'),
    cert: fs.readFileSync(certPath, 'utf8'),
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: { tsconfigPath: './tsconfig.app.json' },
      overlay: true,
    }),
  ],
  server: {
    port: 7003,
    https,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
