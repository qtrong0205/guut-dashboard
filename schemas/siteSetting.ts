export default {
  name: 'siteSettings',
  title: 'Cài đặt trang web',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên cấu hình',
      type: 'string',
      placeholder: 'VD: v1, v2, bản chính,...',
      validation: (R: any) => R.required(),
    },
    {
      name: 'banners',
      title: 'Banner các trang',
      type: 'object',
      fields: [
        {name: 'home', title: 'Trang chủ', type: 'bannerItem'},
        {name: 'about', title: 'Giới thiệu', type: 'bannerItem'},
        {name: 'project', title: 'Dự án', type: 'bannerItem'},
        {name: 'news', title: 'Tin tức', type: 'bannerItem'},
        {name: 'contact', title: 'Liên hệ', type: 'bannerItem'},
      ],
    },
  ],
}
