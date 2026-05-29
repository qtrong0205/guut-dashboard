export default {
  name: 'bannerItem',
  title: 'Banner',
  type: 'object',
  fields: [
    {name: 'image', title: 'Ảnh banner', type: 'image', options: {hotspot: true}},
    {name: 'heading', title: 'Tiêu đề', type: 'string'},
    {name: 'subtext', title: 'Mô tả phụ', type: 'text'},
  ],
}
