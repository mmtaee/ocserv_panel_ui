<script setup>
import { useLocale } from 'vuetify/framework'

const { t } = useLocale()

defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-card class="ma-3 bg-background text-white" variant="tonal">
    <v-card-title class="text-subtitle-2 text-center">
      {{ t('RESULT') }}
    </v-card-title>
    <v-card-text v-for="(val, key) in data?.value" v-show="val !== null" :key="`${key}-${val}`">
      {{ key }}: {{ val }}
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
