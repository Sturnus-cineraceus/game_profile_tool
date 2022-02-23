import axios from 'axios'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | フォトナプロフ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/logo_small.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/auth', mode: 'client' },
    '@/plugins/logger'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  serverMiddleware: ['~/api'],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dayjs',
    '@nuxtjs/sitemap',
  ],
  bootstrapVue: {
    icons: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: '0'
  },
  publicRuntimeConfig: {
    DEV_MODE: process.env.DEV_MODE,
    DOMAIN: process.env.DOMAIN,
    HTTP_PROTOCOL: process.env.HTTP_PROTOCOL,
    TOP_IMG: process.env.TOP_IMG
  }
  , dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://games.glorificatio.org/',
    exclude: ['/ctrl/**', '/ctrl', '/profile_edit', '/login', '/logout', '/callback'],
    routes: async (callback) => {
      try {
        const data = await axios.get('http://localhost:3000/v1/api/latest/list?limit=300')
        const rt = data.data.latest.map((post) => { return `/profile/${post.user_id}` })
        callback(null, rt)
      } catch {
        callback()
      }

    }
  }
}
