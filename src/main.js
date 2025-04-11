import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useConfigStore } from '@/stores/config.js'

import router from './plugins/router.js'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)
;(async () => {
  const configStore = useConfigStore()
  await configStore.fetchConfig()

  app.mount('#app')
})()
