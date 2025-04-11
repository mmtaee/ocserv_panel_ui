<script setup>
import { useLocale } from 'vuetify'
import { ref, toRaw } from 'vue'
import Admin from '@/components/setup/Admin.vue'
import CenterLayout from '@/components/layouts/CenterLayout.vue'
import Config from '@/components/setup/Config.vue'
import OcservGroup from '@/components/setup/OcservGroup.vue'
import Finalize from '@/components/setup/Finalize.vue'

const step = ref(1)
const { t } = useLocale()
const loading = ref(false)
const formIsValid = ref(false)

const ocservGroupFields = {
  rx: null,
  tx: null,
  maxSameClient: null,
  dns1: null,
  dns2: null,
  ipv4Network: null,
  noUDP: null,
  keepAlive: null,
  dpd: null,
  mobileDpd: null,
  tunnelAllDns: null,
  restrictUserToRoute: null,
  statsReportTime: null,
  mtu: null,
  idleTimeout: null,
  mobileIdleTimeout: null,
  sessionTimeout: null,
}

const bodyData = ref({
  username: null,
  password: null,
  googleCaptchaSiteKey: null,
  googleCaptchaSecretKey: null,
  ...toRaw(ocservGroupFields),
})

const steps = [
  {
    complete: false,
    title: t('ADMIN_REGISTRY_SETUP'),
    component: Admin,
    data: { username: null, password: null },
  },
  {
    complete: false,
    title: t('SITE_CONFIG_SETUP'),
    component: Config,
    data: {
      googleCaptchaSiteKey: null,
      googleCaptchaSecretKey: null,
    },
  },
  {
    complete: false,
    title: t('DEFAULT_OCSERV_GROUP_SETUP'),
    component: OcservGroup,
    data: ocservGroupFields,
  },
  {
    complete: false,
    title: t('FINALIZATION_SETUP'),
    component: Finalize,
    loading: false,
    data: bodyData,
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
  delete result.valid
  Object.assign(steps[step.value - 1].data, result)

  bodyData.value = {
    ...bodyData.value,
    ...result,
  }
}
</script>

<template>
  <CenterLayout>
    <v-card color="secondary" width="70%">
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

          <v-stepper-window v-for="(st, index) in steps" :key="index + 1" class="ma-0 ml-3 mt-2">
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
