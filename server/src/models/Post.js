import mongoose from 'mongoose';

const localizedSchema = new mongoose.Schema(
  {
    vi: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    title: { type: localizedSchema, default: () => ({ vi: '', en: '' }) },
    excerpt: { type: localizedSchema, default: () => ({ vi: '', en: '' }) },
    content: { type: localizedSchema, default: () => ({ vi: '', en: '' }) },
    coverImage: { type: String, default: '' },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
