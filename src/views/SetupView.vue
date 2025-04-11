<script setup>
import { useLocale } from 'vuetify'
import { ref } from 'vue'
import Admin from '@/components/setup/Admin.vue'
import CenterLayout from '@/components/CenterLayout.vue'
import Config from '@/components/setup/Config.vue'

const step = ref(1)
const { t } = useLocale()
const loading = ref(false)
const formIsValid = ref(false)

const bodyData = ref({
  username: null,
  password: null,
  googleCaptchaSiteKey: null,
  googleCaptchaSecretKey: null,
})

const steps = [
  {
    complete: false,
    title: t('ADMIN_REGISTRY'),
    component: Admin,
    data: { username: null, password: null },
  },
  {
    complete: false,
    title: t('SITE_CONFIG'),
    component: Config,
    data: {
      googleCaptchaSiteKey: null,
      googleCaptchaSecretKey: null,
    },
  },
  {
    complete: false,
    title: t('DEFAULT_OCSERV_GROUP'),
    component: '',
  },
  {
    complete: false,
    title: t('FINALIZATION_CONFIG'),
    component: '',
    loading: false,
  },
]

function nextStep() {
  if (step.value < steps.length + 1) {
    steps[step.value - 1].complete = true
    if (step.value === steps.length) {
      steps[steps.length - 1].complete = true
      loading.value = true
      // call api function here
    }
    step.value++
  }
}

function prevStep() {
  if (step.value > 1) {
    steps[step.value - 2].complete = false
    step.value--
  }
}

const handleResult = (result) => {
  formIsValid.value = result?.valid

  switch (step.value) {
    case 1:
      steps[0].data.username = result.username
      steps[0].data.password = result.password
      bodyData.username = result.username
      bodyData.password = result.password
      break
    case 2:
      steps[1].data.googleCaptchaSiteKey = result.googleCaptchaSiteKey
      steps[1].data.googleCaptchaSecretKey = result.googleCaptchaSecretKey
      bodyData.googleCaptchaSiteKey = result.googleCaptchaSiteKey
      bodyData.googleCaptchaSecretKey = result.googleCaptchaSecretKey
      break
    default:
  }
}
</script>

<template>
  <CenterLayout>
    <v-card color="secondary">
      <v-card-title class="pa-3 ma-3 text-white">
        {{ t('SETUP_SERVICE') }}
      </v-card-title>

      <v-card-text class="my-3">
        <v-stepper non-linear>
          <v-stepper-header dark>
            <v-stepper-item
              v-for="(st, index) in steps"
              :key="index + 1"
              :complete="st.complete"
              :disabled="step !== index + 1"
              :rules="st.rules"
              :value="index + 1"
            >
              <template v-slot:title>
                {{ st.title }}
              </template>
            </v-stepper-item>
          </v-stepper-header>

          <v-stepper-window v-for="(st, index) in steps" :key="index + 1">
            <component
              :is="st.component"
              v-if="Boolean(st.component) && step === index + 1"
              :data="st.data"
              @sendResult="handleResult"
            />
          </v-stepper-window>

          <v-stepper-actions>
            <template v-slot:next>
              <v-btn
                :disabled="step > steps.length + 1 || !formIsValid"
                :loading="loading"
                color="primary"
                variant="tonal"
                @click="nextStep"
              >
                {{ step < steps.length ? t('Next_BTN') : t('FINALIZATION_CONFIG') }}
              </v-btn>
            </template>

            <template v-slot:prev>
              <v-btn
                :disabled="step === 1 || loading"
                :loading="false"
                color="primary"
                variant="tonal"
                @click="prevStep"
              >
                {{ t('PREV_BTN') }}
              </v-btn>
            </template>
          </v-stepper-actions>
        </v-stepper>
      </v-card-text>
    </v-card>
  </CenterLayout>
</template>
