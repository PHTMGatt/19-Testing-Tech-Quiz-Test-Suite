import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import db from './config/connection.js';
import routes from './routes/index.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();

// __dirname does not exist in an ES module; build it from import.meta.url.
// This file compiles to server/dist/server.js, so the built client is two levels up.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, '../../client/dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files first, so /assets/*.js and /assets/*.css are served as real files.
// The index.html catch-all lives at the end of the router below.
app.use(express.static(clientDist));
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
