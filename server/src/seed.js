import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Post } from './models/Post.js';
import { posts } from './seedPosts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  await connectDB();

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash });
    console.log(`Created admin user: ${username}`);
  } else {
    console.log(`Admin user "${username}" already exists`);
  }

  // Upsert all blog posts by slug (idempotent: re-running updates, never duplicates)
  for (const post of posts) {
    await Post.findOneAndUpdate({ slug: post.slug }, post, {
      upsert: true,
      new: true,
      runValidators: true
    });
  }
  console.log(`Seeded ${posts.length} blog posts`);

  await mongoose.disconnect();
  console.log('Seed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});