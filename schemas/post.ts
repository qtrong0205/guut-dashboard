export default {
  name: 'post',
  title: 'Tin tức',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tiêu đề', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'heroImage', title: 'Ảnh hero', type: 'image', options: { hotspot: true } },
    { name: 'category', title: 'Danh mục', type: 'string',
      options: { list: ['Xu Hướng', 'Kiến Thức', 'Sự Kiện'] }
    },
    { name: 'publishedAt', title: 'Ngày đăng', type: 'datetime' },
    { name: 'summary', title: 'Tóm tắt', type: 'text' },
    { name: 'body', title: 'Nội dung', type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }]
    },
    { name: 'relatedPosts', title: 'Bài liên quan', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (R: any) => R.max(3)
    },
  ]
}