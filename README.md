# Guu Dashboard CMS (Sanity Studio)

## Giới thiệu chung

Đây là CMS cho dashboard của dự án **Guu & T**, xây dựng bằng **Sanity Studio**.

Studio hiện có 5 schema types (4 document + 1 object):

1. **project** (document): Dự án (tên, slug, ảnh hero, gallery, dịch vụ, diện tích, phong cách, địa điểm, năm, mô tả ngắn, nổi bật, dự án liên quan).
2. **post** (document): Tin tức/bài viết (tiêu đề, slug, ảnh hero, danh mục, ngày đăng, tóm tắt, nội dung, bài liên quan).
3. **teamMember** (document): Thành viên đội ngũ (tên, chức vụ, ảnh, thứ tự hiển thị).
4. **siteSettings** (document): Cấu hình website (tên cấu hình, banner theo trang).
5. **bannerItem** (object): Banner (ảnh, tiêu đề, mô tả phụ).

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
  "slug": {"_type": "slug", "current": "biet-thu-hien-dai-quan-2"},
  "heroImage": {
    "_type": "image",
    "asset": {"_ref": "image-hero-abc123"}
  },
  "gallery": [
    {"_type": "image", "asset": {"_ref": "image-g1-abc123"}},
    {"_type": "image", "asset": {"_ref": "image-g2-abc123"}}
  ],
  "serviceType": "Nội Thất",
  "area": 350,
  "style": "Modern Luxury",
  "location": "TP. Hồ Chí Minh",
  "year": 2025,
  "shortDesc": "Thiết kế và thi công trọn gói biệt thự cao cấp.",
  "featured": true,
  "relatedProjects": [
    {"_type": "reference", "_ref": "project-001"},
    {"_type": "reference", "_ref": "project-002"}
  ]
}
```

### 2) `post`

```json
{
  "_id": "post-xyz789",
  "_type": "post",
  "title": "Xu hướng nội thất 2026",
  "slug": {"_type": "slug", "current": "xu-huong-noi-that-2026"},
  "heroImage": {
    "_type": "image",
    "asset": {"_ref": "image-post-hero-xyz789"}
  },
  "category": "Xu Hướng",
  "publishedAt": "2026-03-10T09:00:00Z",
  "summary": "Tổng hợp các xu hướng nội thất nổi bật năm 2026.",
  "body": [
    {"_type": "block", "children": [{"_type": "span", "text": "Nội dung..."}]},
    {"_type": "image", "asset": {"_ref": "image-body-xyz789"}}
  ],
  "relatedPosts": [
    {"_type": "reference", "_ref": "post-001"},
    {"_type": "reference", "_ref": "post-002"}
  ]
}
```

### 3) `teamMember`

```json
{
  "_id": "team-001",
  "_type": "teamMember",
  "name": "Nguyễn Văn A",
  "position": "Kiến trúc sư trưởng",
  "photo": {
    "_type": "image",
    "asset": {"_ref": "image-member-001"}
  },
  "order": 1
}
```

### 4) `siteSettings`

```json
{
  "_id": "siteSettings-001",
  "_type": "siteSettings",
  "title": "Bản chính",
  "banners": {
    "home": {
      "image": {"_type": "image", "asset": {"_ref": "image-home-001"}},
      "heading": "Guu & T Studio",
      "subtext": "Không gian sống tinh tế và bền vững."
    },
    "about": {
      "image": {"_type": "image", "asset": {"_ref": "image-about-001"}},
      "heading": "Về chúng tôi",
      "subtext": "Đội ngũ giàu kinh nghiệm trong thiết kế."
    },
    "project": {
      "image": {"_type": "image", "asset": {"_ref": "image-project-001"}},
      "heading": "Dự án nổi bật",
      "subtext": "Tổng hợp các dự án tiêu biểu."
    },
    "news": {
      "image": {"_type": "image", "asset": {"_ref": "image-news-001"}},
      "heading": "Tin tức",
      "subtext": "Xu hướng và kiến thức nội thất."
    },
    "contact": {
      "image": {"_type": "image", "asset": {"_ref": "image-contact-001"}},
      "heading": "Liên hệ",
      "subtext": "Kết nối với Guu & T."
    }
  }
}
```

### 5) `bannerItem` (object)

```json
{
  "image": {"_type": "image", "asset": {"_ref": "image-banner-001"}},
  "heading": "Không gian sống mới",
  "subtext": "Thiết kế tinh gọn, tối ưu công năng."
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
  title,
  banners{
    home{heading, subtext, "imageUrl": image.asset->url},
    about{heading, subtext, "imageUrl": image.asset->url},
    project{heading, subtext, "imageUrl": image.asset->url},
    news{heading, subtext, "imageUrl": image.asset->url},
    contact{heading, subtext, "imageUrl": image.asset->url}
  }
}
```
