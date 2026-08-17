import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { requireAuth } from '../middleware/auth.js';
import { getR2Client, R2_BUCKET, R2_PUBLIC_URL } from '../config/r2.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export const uploadRouter = Router();

uploadRouter.use(requireAuth);

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  const key = `blog/${randomUUID()}${ext}`;

  try {
    await getR2Client().send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      })
    );
    res.status(201).json({ url: `${R2_PUBLIC_URL}/${key}` });
  } catch (err) {
    console.error('R2 upload failed:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});
