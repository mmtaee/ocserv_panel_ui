<script setup>
import { useLocale } from 'vuetify/framework'
import CenterLayout from '@/components/CenterLayout.vue'
import { ref } from 'vue'

const emit = defineEmits(['sendResult'])
const valid = ref(true)
const { t } = useLocale()

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const formValues = ref({
  username: null,
  password: null,
})

function required(v) {
  return !!v || t('FIELD_IS_REQUIRED')
}

const sendResult = () => {
  if (!Boolean(formValues.value.username) || !Boolean(formValues.value.password)) {
    valid.value = false
  } else {
    emit('sendResult', {
      valid: valid.value,
      username: formValues.value.username,
      password: formValues.value.password,
    })
  }
}

if (props.data?.username !== null) {
  formValues.value.username = props.data?.username
}

if (props.data?.password !== null) {
  formValues.value.password = props.data?.password
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
              :label="t('USERNAME')"
              :rules="[required]"
              clearable
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
              :label="t('PASSWORD')"
              :rules="[required]"
              clearable
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
