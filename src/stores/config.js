import { defineStore } from 'pinia'
import api from '@/services/api.js'
import router from '@/plugins/router.js'

export const useConfigStore = defineStore('config', {
  state: () => ({
    setup: true,
    configs: {},
  }),

  actions: {
    async fetchConfig() {
      api
        .get('config/')
        .then((response) => {
          this.config = response.data.configs
          this.setup = !!response.data.configs
        })
        .catch((err) => {
          if (err.status === undefined) {
            router.push({ path: '/error', query: { message: err.message } })
          }
        })
    },
  },
})
