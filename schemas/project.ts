export default {
  name: 'project',
  title: 'Dự án',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tên dự án', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'heroImage', title: 'Ảnh hero', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Gallery ảnh', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'serviceType', title: 'Loại dịch vụ', type: 'string',
      options: { list: ['Nội Thất', 'Kiến Trúc', 'Thi Công', 'Xây Dựng'] }
    },
    { name: 'area', title: 'Diện tích (m²)', type: 'number' },
    { name: 'style', title: 'Phong cách', type: 'string' },
    { name: 'location', title: 'Địa điểm', type: 'string' },
    { name: 'year', title: 'Năm thực hiện', type: 'number' },
    { name: 'shortDesc', title: 'Mô tả ngắn', type: 'text' },
    { name: 'featured', title: 'Dự án nổi bật', type: 'boolean' },
    { name: 'relatedProjects', title: 'Dự án liên quan', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (R: any) => R.max(3)
    },
  ]
}