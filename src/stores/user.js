import { defineStore } from 'pinia'
import router from '@/plugins/router.js'
import api from '@/services/api.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      api
        .get('users/')
        .then((response) => {
          this.user = response.data.user
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log(err.message)
          } else if (err.status === undefined) {
            router.push({ path: '/error', query: { message: err.message } })
          }
        })
    },
  },
})
