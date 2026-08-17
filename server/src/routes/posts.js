import { Router } from 'express';
import { Post } from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

// Public routes: only published posts
export const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ published: true }).sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

postsRouter.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes: protected, all posts (including unpublished)
export const adminPostsRouter = Router();

adminPostsRouter.use(requireAuth);

adminPostsRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

adminPostsRouter.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Slug already exists' });
    }
    res.status(400).json({ message: err.message });
  }
});

adminPostsRouter.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Slug already exists' });
    }
    res.status(400).json({ message: err.message });
  }
});

adminPostsRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
