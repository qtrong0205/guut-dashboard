# Guu Dashboard CMS (Sanity Studio)

## Giới thiệu chung

Đây là CMS cho dashboard của dự án **Guu & T**, xây dựng bằng **Sanity Studio**.

Studio hiện quản lý 4 nhóm dữ liệu chính:

1. **project**: Dự án (tên, slug, ảnh, gallery, dịch vụ, diện tích, phong cách, địa điểm, năm, mô tả, nổi bật, liên quan).
2. **post**: Tin tức/bài viết (tiêu đề, slug, ảnh hero, danh mục, ngày đăng, tóm tắt, nội dung, bài liên quan).
3. **teamMember**: Thành viên đội ngũ (tên, chức vụ, ảnh, thứ tự hiển thị).
4. **siteSettings**: Cấu hình website (liên hệ, social links, thống kê).

Thông tin project đang dùng trong code:

- `projectId`: `08k96exq`
- `dataset`: `production`

## Hướng dẫn chạy dashboard (Sanity Studio)

### 1) Cài dependencies

```bash
npm install
```

### 2) Chạy môi trường local

```bash
npm run dev
```

Mặc định Studio sẽ chạy local (thường tại `http://localhost:3333` hoặc port được Sanity báo trong terminal).

### 3) Build và deploy

```bash
npm run build
npm run deploy
```

Nếu dùng GraphQL API của Sanity:

```bash
npm run deploy-graphql
```

## Hướng dẫn query API tại frontend

Frontend có thể query trực tiếp từ Sanity bằng GROQ qua 2 cách:

1. Dùng thư viện `@sanity/client` (khuyến nghị).
2. Gọi HTTP endpoint query trực tiếp.

### Cách 1: dùng `@sanity/client`

```ts
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '08k96exq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})
```

Ví dụ query danh sách dự án nổi bật:

```ts
const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(year desc){
    _id,
    title,
    "slug": slug.current,
    serviceType,
    area,
    style,
    location,
    year,
    shortDesc,
    featured,
    "heroImageUrl": heroImage.asset->url,
    "galleryUrls": gallery[].asset->url
  }
`

const projects = await client.fetch(featuredProjectsQuery)
```

### Cách 2: gọi endpoint trực tiếp

```ts
const query = `*[_type == "post"] | order(publishedAt desc)[0...5]{title, "slug": slug.current, summary}`
const url = `https://08k96exq.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(query)}`
const res = await fetch(url)
const data = await res.json()
// data.result là mảng kết quả
```

## Output mẫu dựa trên schemas

### 1) `project`

```json
{
  "_id": "project-abc123",
  "_type": "project",
  "title": "Biệt thự hiện đại Quận 2",
  "slug": "biet-thu-hien-dai-quan-2",
  "heroImageUrl": "https://cdn.sanity.io/images/.../hero.jpg",
  "galleryUrls": [
    "https://cdn.sanity.io/images/.../g1.jpg",
    "https://cdn.sanity.io/images/.../g2.jpg"
  ],
  "serviceType": "Nội Thất",
  "area": 350,
  "style": "Modern Luxury",
  "location": "TP. Hồ Chí Minh",
  "year": 2025,
  "shortDesc": "Thiết kế và thi công trọn gói biệt thự cao cấp.",
  "featured": true
}
```

### 2) `post`

```json
{
  "_id": "post-xyz789",
  "_type": "post",
  "title": "Xu hướng nội thất 2026",
  "slug": "xu-huong-noi-that-2026",
  "heroImageUrl": "https://cdn.sanity.io/images/.../post-hero.jpg",
  "category": "Xu Hướng",
  "publishedAt": "2026-03-10T09:00:00Z",
  "summary": "Tổng hợp các xu hướng nội thất nổi bật năm 2026.",
  "body": [
    {"_type": "block", "children": [{"_type": "span", "text": "Nội dung..."}]}
  ],
  "relatedPosts": ["post-a", "post-b"]
}
```

### 3) `teamMember`

```json
{
  "_id": "team-001",
  "_type": "teamMember",
  "name": "Nguyễn Văn A",
  "position": "Kiến trúc sư trưởng",
  "photoUrl": "https://cdn.sanity.io/images/.../member.jpg",
  "order": 1
}
```

### 4) `siteSettings`

```json
{
  "_id": "siteSettings",
  "_type": "siteSettings",
  "phone": "0901xxxxxx",
  "email": "hello@guuandt.vn",
  "address": "TP. Hồ Chí Minh, Việt Nam",
  "zaloUrl": "https://zalo.me/...",
  "facebookUrl": "https://facebook.com/...",
  "instagramUrl": "https://instagram.com/...",
  "stats": {
    "projects": 120,
    "years": 10,
    "clients": 85,
    "partners": 30
  }
}
```

## GROQ mẫu để frontend dùng nhanh

```groq
// Project nổi bật
*[_type == "project" && featured == true] | order(year desc){
  _id, title, "slug": slug.current, serviceType, area, style, location, year, shortDesc,
  "heroImageUrl": heroImage.asset->url,
  "galleryUrls": gallery[].asset->url
}

// Bài viết mới nhất
*[_type == "post"] | order(publishedAt desc)[0...6]{
  _id, title, "slug": slug.current, category, publishedAt, summary,
  "heroImageUrl": heroImage.asset->url
}

// Đội ngũ theo thứ tự
*[_type == "teamMember"] | order(order asc){
  _id, name, position, order, "photoUrl": photo.asset->url
}

// Cài đặt website (single document)
*[_type == "siteSettings"][0]{
  phone, email, address, zaloUrl, facebookUrl, instagramUrl, stats
}
```
