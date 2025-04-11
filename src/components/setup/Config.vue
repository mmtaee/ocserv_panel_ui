<script setup>
import { useLocale } from 'vuetify/framework'
import { ref } from 'vue'
import CenterLayout from '@/components/CenterLayout.vue'

const { t } = useLocale()
const emit = defineEmits(['sendResult'])

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const formValues = ref({
  googleCaptchaSiteKey: null,
  googleCaptchaSecretKey: null,
})

const sendResult = () => {
  emit('sendResult', {
    valid: true,
    googleCaptchaSiteKey: formValues.value.googleCaptchaSiteKey,
    googleCaptchaSecretKey: formValues.value.googleCaptchaSecretKey,
  })
}

if (props.data?.googleCaptchaSiteKey !== null) {
  formValues.value.googleCaptchaSiteKey = props.data?.googleCaptchaSiteKey
}

if (props.data?.googleCaptchaSecretKey !== null) {
  formValues.value.googleCaptchaSecretKey = props.data?.googleCaptchaSecretKey
}
</script>

<template>
  <CenterLayout>
    <v-card-text>
      <v-form>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" sm="12">
            <v-textarea
              v-model="formValues.googleCaptchaSiteKey"
              :label="t('GOOGLE_CAPTCHA_SITE_KEY')"
              hide-details="auto"
              rows="4"
              variant="solo-filled"
              @keyup="sendResult"
              @click:clear="sendResult"
            />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-textarea
              v-model="formValues.googleCaptchaSecretKey"
              :label="t('GOOGLE_CAPTCHA_SECRET_KEY')"
              hide-details="auto"
              rows="4"
              variant="solo-filled"
              @keyup="sendResult"
              @click:clear="sendResult"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </CenterLayout>
</template>
