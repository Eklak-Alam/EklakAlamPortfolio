// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://eklak.site', // Your ONE and ONLY link
      lastModified: new Date(),
      changeFrequency: 'monthly', // How often you update it
      priority: 1,                // 1 means "This is the most important page"
    },
  ];
}