import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Google Apps Script Web App URL for Google Sheets Order Tracking
export const GOOGLE_APPS_SCRIPT_URL =
  process.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzeKiBVm174kks7lY4fZbZ4ETSfmwGOmbKKwEtFVrG4dYfo6mRwf-oIsr9h8evTX6co/exec';

function googleAppsScriptProxyPlugin(): Plugin {
  return {
    name: 'google-apps-script-proxy',
    configureServer(server) {
      server.middlewares.use('/api/submit-order', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: body,
            });

            const text = await scriptResponse.text();
            res.setHeader('Content-Type', 'application/json');

            res.statusCode = scriptResponse.status || 200;
            res.end(text);
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 502;
            res.end(
              JSON.stringify({
                success: false,
                error: err?.message || 'Proxy request to Google Apps Script failed',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), googleAppsScriptProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

