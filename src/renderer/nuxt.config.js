/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
const { resolve } = require('path')


module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'enab-nuxt', 
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { name: 'HandheldFriendly', content: 'true' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { "http-equiv":"cache-control", content:"public/private"}
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/css/font.css',
    // '~/assets/css/quick-website.css',
    // '~/assets/css/responsive.css',
    '~/assets/scss/app.scss',
    'vuejs-dialog/dist/vuejs-dialog.min.css',
    'vue-select/dist/vue-select.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {ssr: true, src: '@/plugins/icons.js'},
    {src: '~/plugins/updater.js', mode: 'client'},
    {src: '~/plugins/custom-functions.js', mode: 'client'},
    {src: '~/plugins/vuejs-dialog.js', mode: 'client'},
    {src: '~/plugins/vuejs-select.js', mode: 'client'},
    {src: '~/plugins/vue-long-click.js', mode: 'client'},
    {src: "~/plugins/crisp.js", mode: "client"},
    {src: "~/plugins/utilities.js", mode: "client"},
    {src: "~/plugins/click-outside.js", mode: "client"},

    



    

  ],
  
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: false,
  
  buildModules: [
    '@nuxtjs/moment',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Auth
    '@nuxtjs/auth-next',
    // style resource
    '@nuxtjs/style-resources',
    
    'nuxt-i18n',

    '@nuxtjs/toast',

    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',

    'cookie-universal-nuxt',
    
    'vue-swatches/nuxt',

  ],

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  toast: {
    position: 'top-left',
    duration : 2500
  },

  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    vueI18n: {
      fallbackLocale: 'ar',
      numberFormats: {
        ar: {
          currency: {
            style: 'currency', 
            currency: 'iqd'
          }
        }
      }
    },
  },

  auth: {
    rewriteRedirects: false,
    redirect: {
      login: '/login',
      callback: false,
      home: false
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'https://api.enab.app',
        endpoints: {
          login: {
            url: '/api/auth/login',
          },
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 7
        },
        refreshToken: {
          maxAge: 20160 * 60 * 24 * 7
        },
      },
    }
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://pos.itourstory.com',
    baseURL: 'https://api.enab.app',
    withCredentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    meta: {
      name: "عنب",
      author: 'Ourstory'
    },
    manifest: {
      name: 'Enab',
      short_name: 'Enab',
      lang: 'ar',
      // start_url: "/",
      // display: 'standalone',
    },
    // workbox: {
    //   cachingExtensions: '@/plugins/workbox-sync.js',
    //   enabled: true,
    //   clientsClaim: true,
    //   // runtimeCaching: [
    //   //   { urlPattern: '/*' },
    //   // ],
    //   LOG_LEVEL: 'debug'
    // },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
    // hotMiddleware: {
    //   client: {
    //     overlay: false
    //   }
    // },
  // },

  // styleResource
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ]
  },
  
  // resolve: {
  //   alias: {
  //     vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.common.js' for webpack 1
  //   }
  // },
  
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
  },
  

};
