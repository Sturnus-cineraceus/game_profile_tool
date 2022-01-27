export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ゲームの履歴書',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/auth', mode: 'client' }
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
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      auth0: {
        domain: 'dev-y63ry488.us.auth0.com',
        client_id: 'UrMc4Rsg3wKjWbhU4NcpqRcw4FthSeQ0',
      }
    },
    redirect: {
      login: '/',  // 未ログイン時のリダイレクト先
      logout: '/logout',  // ログアウト処理を実行した直後のリダイレクト先
      callback: '/callback',  // コールバックURL
      home: '/mypage',  // ログイン後に遷移するページ
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: '0'
  }
}
