export default {
  name: 'siteSettings',
  title: 'Cài đặt website',
  type: 'document',
  fields: [
    { name: 'phone', title: 'Số điện thoại', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Địa chỉ', type: 'text' },
    { name: 'zaloUrl', title: 'Link Zalo', type: 'url' },
    { name: 'facebookUrl', title: 'Link Facebook', type: 'url' },
    { name: 'instagramUrl', title: 'Link Instagram', type: 'url' },
    { name: 'stats', title: 'Thống kê', type: 'object', fields: [
      { name: 'projects', title: 'Số dự án', type: 'number' },
      { name: 'years', title: 'Số năm', type: 'number' },
      { name: 'clients', title: 'Số khách hàng', type: 'number' },
      { name: 'partners', title: 'Số đối tác', type: 'number' },
    ]},
  ]
}