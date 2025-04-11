<script setup>
import { useLocale } from 'vuetify/framework'
import CenterLayout from '@/components/layouts/CenterLayout.vue'
import { reactive, ref, toRaw } from 'vue'
import { requiredRule } from '@/utils/rules.js'

const emit = defineEmits(['sendResult'])
const valid = ref(true)
const { t } = useLocale()

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const rules = {
  required: (v) => requiredRule(v, t),
}

const formValues = reactive({
  username: null,
  password: null,
})

const sendResult = () => {
  if (!Boolean(formValues.username) || !Boolean(formValues.password)) {
    valid.value = false
  } else {
    emit('sendResult', {
      valid: valid.value,
      ...toRaw(formValues),
    })
  }
}

if (props.data) {
  Object.assign(formValues, structuredClone(props.data))
}
</script>

<template>
  <CenterLayout>
    <v-card-text>
      <v-form v-model="valid">
        <v-row align="center" justify="center">
          <v-col class="pa-0 ma-0" cols="12" md="6" sm="12">
            <v-text-field
              v-model="formValues.username"
              :clearable="readOnly"
              :label="t('USERNAME')"
              :readonly="readOnly"
              :rules="[rules.required]"
              variant="solo-filled"
              @keyup="sendResult"
              @click:clear="sendResult"
            />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="pa-0 ma-0" cols="12" md="6" sm="12">
            <v-text-field
              v-model="formValues.password"
              :clearable="readOnly"
              :label="t('PASSWORD')"
              :readonly="readOnly"
              :rules="[rules.required]"
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

<style scoped></style>
