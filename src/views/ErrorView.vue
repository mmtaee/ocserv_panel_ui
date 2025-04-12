<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const errorMessage = route.query?.message || 'Unknown Error'
</script>

<template>
  <v-row align="center" justify="center">
    <v-col class="d-flex justify-center" cols="12" md="12">
      <v-card
        :text="errorMessage.toString()"
        class="pa-5"
        color="error"
        subtitle="Something went wrong"
        title="Oops!"
        variant="tonal"
      />
    </v-col>
  </v-row>
  <!--  </v-container>-->
</template>
