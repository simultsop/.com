import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "simultsop",
  description: "Journey to SaaS pragmatization",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DRY components', link: '/dry' },
      { text: 'D1Driver', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Packages',
        items: [
          { text: 'DRY components', link: '/dry' },
          { text: 'D1Driver', link: '/markdown-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/simultsop' }
    ]
  }
})
