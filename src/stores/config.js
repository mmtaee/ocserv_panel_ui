import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    setup: null,
    configs: {},
  }),

  actions: {
    async fetchConfig() {
      this.setup = false
      // api
      //   .get('config/')
      //   .then((response) => {
      //     this.setup = response.config
      //   })
      //   .catch((err) => {
      //     if (err.status === undefined) {
      //       router.push({ path: '/error', query: { message: err.message } })
      //     }
      //   })
    },
  },
})
