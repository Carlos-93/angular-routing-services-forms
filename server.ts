import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Host header validation uses security.allowedHosts in angular.json; in production add hosts via NG_ALLOWED_HOSTS (comma-separated)
const angularApp = new AngularNodeAppEngine();

// Example Express Rest API endpoints
// app.get('/api/{*splat}', (req, res) => { });

// Serve static files from /browser
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false
}));

// All regular routes use the Angular engine
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => response ? writeResponseToNodeResponse(response, res) : next())
    .catch(next);
});

// Start the server only when run directly (not when imported by the Angular CLI dev-server or build)
if (isMainModule(import.meta.url)) {
  const port = process.env['SSR_PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Request handler used by the Angular CLI (dev-server and build) or serverless functions
export const reqHandler = createNodeRequestHandler(app);
