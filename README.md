# PC34 Studio Portfolio

Portfolio của PC34 Studio — dựng lại với kiến trúc **Vue 3 (Vite) + Express.js + MongoDB**.

- **Frontend**: Vue 3 + Vue Router + Vite (`client/`)
- **Backend**: Express + Mongoose (`server/`)
- **Database**: MongoDB (Railway)
- **Blog**: viết bài chia sẻ kiến thức, có trang admin đăng nhập để quản lý.

## Cấu trúc

```
portfolio/
├── client/            # Vue 3 + Vite (frontend)
│   └── src/
│       ├── components/  # NavBar, Hero, Services, Projects, Marquee...
│       ├── views/       # Home, Blog, BlogPost, AdminLogin, AdminDashboard
│       ├── i18n.js      # song ngữ VN/EN
│       ├── router/      # Vue Router
│       └── assets/      # style.css + ảnh
├── server/            # Express + Mongoose (backend)
│   └── src/
│       ├── models/      # Post, User
│       ├── routes/      # auth, posts
│       ├── middleware/  # JWT auth
│       ├── app.js
│       ├── index.js
│       └── seed.js      # tạo admin + bài mẫu
└── package.json       # scripts gốc (build/start cho Railway)
```

## Yêu cầu

- Node.js >= 18
- MongoDB (local hoặc Railway)

## Cài đặt & chạy dev

1. Tạo file môi trường cho backend:

```bash
cp server/.env.example server/.env
```

Sửa `server/.env` với connection string MongoDB và mật khẩu của bạn:

```env
MONGODB_URI=mongodb://<user>:<password>@<host>:27017/portfolio?authSource=admin
JWT_SECRET=<chuỗi ngẫu nhiên dài>
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<mật khẩu admin>

# Cloudflare R2 (S3-compatible) — lưu ảnh blog
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<access-key-id>
R2_SECRET_ACCESS_KEY=<secret-access-key>
R2_BUCKET=<bucket-name>
R2_PUBLIC_URL=https://pub-<hex>.r2.dev
```

2. Cài dependencies (npm workspaces — cài 1 lần cho cả client + server):

```bash
npm install
```

3. Seed admin + bài mẫu:

```bash
npm run seed
```

4. Chạy backend (port 3000):

```bash
npm run dev:server
```

5. Chạy frontend (port 5173, proxy `/api` → `localhost:3000`):

```bash
npm run dev:client
```

Mở http://localhost:5173

## Build & chạy production (như trên Railway)

```bash
npm install     # cài deps (workspaces)
npm run build   # build frontend → client/dist (backend KHÔNG cần build)
npm start       # Express serve API + client/dist
```

Backend serve luôn bản build tĩnh của Vue, SPA fallback cho mọi route (trừ `/api`).

## Trang admin

- Đăng nhập: `/admin/login` (dùng `ADMIN_USERNAME` / `ADMIN_PASSWORD`)
- Quản lý bài viết: `/admin`

## API endpoints

| Method | Endpoint                | Mô tả                        |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/api/auth/login`       | Đăng nhập → trả JWT token    |
| GET    | `/api/posts`            | Danh sách bài đã publish     |
| GET    | `/api/posts/:slug`      | 1 bài theo slug              |
| GET    | `/api/admin/posts`      | Tất cả bài (cần token)       |
| POST   | `/api/admin/posts`      | Tạo bài (cần token)          |
| PUT    | `/api/admin/posts/:id`  | Sửa bài (cần token)          |
| DELETE | `/api/admin/posts/:id`  | Xóa bài (cần token)          |
| POST   | `/api/admin/upload`     | Upload ảnh lên R2 (multipart `file`, cần token) → trả `{ url }` |

## Upload ảnh lên R2

Trong trang admin (`/admin`), nút **Upload** ở ô "Cover image URL" và nút **Upload image** (cho nội dung Markdown) sẽ upload file lên Cloudflare R2 và trả về URL công khai. Bucket R2 cần **bật public** (qua `r2.dev` hoặc custom domain) để ảnh truy cập vĩnh viễn.

## Deploy Railway (build 1 lần duy nhất)

1. Tạo service Node (Nixpacks tự detect `package.json` ở root).
2. Set các biến môi trường (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `R2_*`) trong dashboard Railway.
3. Nixpacks tự động chạy đúng 1 chuỗi build:
   - `npm install` → cài deps 1 lần cho cả 2 (workspaces).
   - `npm run build` → chỉ build frontend Vue (`vite build` → `client/dist`).
   - `npm start` → chạy backend.
   - **Backend (Express) là JS thuần, chạy trực tiếp — không có bước build riêng.**

## Bảo mật

- **Không commit `.env`** — mọi credential nằm trong biến môi trường.
- Nếu connection string từng bị lộ (paste vào chat/git), hãy **xoay password MongoDB ngay**.
- Password admin được hash bằng `bcryptjs`, auth bằng JWT.

## Lưu ý SEO

Vue SPA render nội dung phía client nên hạn chế SEO so với HTML tĩnh/SSR. Nếu cần SEO tốt cho blog, cân nhắc nâng cấp lên Nuxt (SSR/SSG) sau này.
