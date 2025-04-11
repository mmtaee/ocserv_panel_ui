<script setup>
import { reactive, ref, toRaw } from 'vue'
import { useLocale } from 'vuetify/framework'
import { ipOrRangeRule, ipRule } from '@/utils/rules.js'

const emit = defineEmits(['sendResult'])
const valid = ref(true)
const { t } = useLocale()

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const rules = {
  ip: (v) => ipRule(v, t),
  ipOrRange: (v) => ipOrRangeRule(v, t),
}

const formValues = reactive({
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
})

if (props.data) {
  Object.assign(formValues, structuredClone(props.data))
}

const sendResult = () => {
  emit('sendResult', {
    valid: valid.value,
    ...toRaw(formValues),
  })
}

const selectBoolItems = [
  { text: t('TRUE'), value: 'true' },
  { text: t('FALSE'), value: 'false' },
]
</script>

<template>
  <v-form v-model="valid">
    <v-row align="center" justify="start">
      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.rx"
          :hideInput="false"
          :inset="false"
          :label="t('RX_PER_SECONDS')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.tx"
          :hideInput="false"
          :inset="false"
          :label="t('TX_PER_SECONDS')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.maxSameClient"
          :hideInput="false"
          :inset="false"
          :label="t('MAX_SESSION_PER_CLIENT')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="formValues.dns1"
          :label="t('DNS')"
          :rules="[rules.ip]"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="formValues.dns2"
          :label="t('DNS')"
          :rules="[rules.ip]"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="formValues.ipv4Network"
          :label="t('IPv4Network')"
          :rules="[rules.ipOrRange]"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="formValues.noUDP"
          :items="selectBoolItems"
          :label="t('NO_UDP')"
          clearable
          item-title="text"
          item-value="value"
          @update:modelValue="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.keepAlive"
          :hideInput="false"
          :inset="false"
          :label="t('KEEPALIVE(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.dpd"
          :hideInput="false"
          :inset="false"
          :label="t('DPD(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.mobileDpd"
          :hideInput="false"
          :inset="false"
          :label="t('MOBILE_DPD(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="formValues.tunnelAllDns"
          :items="selectBoolItems"
          :label="t('TUNNEL_ALL_DNS')"
          clearable
          item-title="text"
          item-value="value"
          @update:modelValue="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="formValues.restrictUserToRoute"
          :items="selectBoolItems"
          :label="t('RESTRICT_USER_TO_ROUTES')"
          clearable
          item-title="text"
          item-value="value"
          @update:modelValue="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.statsReportTime"
          :hideInput="false"
          :inset="false"
          :label="t('STATS_REPORT_TIME(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.mtu"
          :hideInput="false"
          :inset="false"
          :label="t('MTU')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.idleTimeout"
          :hideInput="false"
          :inset="false"
          :label="t('IDLE_TIMEOUT(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.mobileIdleTimeout"
          :hideInput="false"
          :inset="false"
          :label="t('MOBILE_IDLE_TIMEOUT(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>

      <v-col cols="12" md="3" sm="12">
        <v-number-input
          v-model="formValues.sessionTimeout"
          :hideInput="false"
          :inset="false"
          :label="t('SESSION_TIMEOUT(SECONDS)')"
          :min="0"
          :reverse="false"
          clearable
          controlVariant="stacked"
          @keyup="sendResult"
          @click:clear="sendResult"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
