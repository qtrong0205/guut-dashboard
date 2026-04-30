export default {
  name: 'teamMember',
  title: 'Đội ngũ',
  type: 'document',
  fields: [
    { name: 'name', title: 'Họ tên', type: 'string' },
    { name: 'position', title: 'Chức vụ', type: 'string' },
    { name: 'photo', title: 'Ảnh', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Thứ tự hiển thị', type: 'number' },
  ]
}