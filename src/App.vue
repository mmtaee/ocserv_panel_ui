<script setup>
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}
</script>

<template>
  <v-app :theme="theme.global.name.value">
    <v-btn @click="toggleTheme">Toggle Theme</v-btn>
    <v-main>
      <v-container class="fill-height d-flex justify-center align-center">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
