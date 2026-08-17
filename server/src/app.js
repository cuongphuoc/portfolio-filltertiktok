import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/auth.js';
import { postsRouter, adminPostsRouter } from './routes/posts.js';
import { uploadRouter } from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/admin/posts', adminPostsRouter);
app.use('/api/admin/upload', uploadRouter);

  // Serve the built Vue frontend
  const dist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(dist));

  // SPA fallback: any non-API route returns index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(dist, 'index.html'), (err) => {
      if (err) next();
    });
  });

  return app;
}
