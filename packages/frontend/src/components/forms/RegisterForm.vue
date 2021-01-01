<template>
  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
    <div class="mb-3" v-if="reg.err">
      <fetch-error-handler :error="reg.err" />
    </div>
    <subtitle>Register</subtitle>
    <paragraph>Let’s create a new account!</paragraph>
    <form
      class="mt-4 w-full"
      @submit.prevent="submitForm"
      v-if="!form.registered"
    >
      <div class="mt-2">
        <input
          v-model="form.username"
          type="text"
          placeholder="New Username"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateUsername"
          :disabled="loading"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.username">{{
          form.errors.username
        }}</span>
      </div>

      <div class="mt-4">
        <input
          v-model="form.password"
          type="password"
          placeholder="New Password"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validatePassword"
          :disabled="loading"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.password">{{
          form.errors.password
        }}</span>
      </div>

      <div class="mt-4">
        <input
          v-model="form.repeat"
          type="password"
          placeholder="Repeat Password"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateRepeat"
          :disabled="loading"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.repeat">{{
          form.errors.repeat
        }}</span>
      </div>
      <div class="mt-4 mb-2 sm:flex sm:flex-row-reverse">
        <Button
          color="purple-500"
          hoverColor="purple-400"
          px="6"
          py="2"
          :loading="loading"
          :disabled="loading"
          type="submit"
        >
          Register
        </Button>
      </div>
    </form>
    <div v-else class="text-gray-400 text-sm mt-6 mb-2">
      You have been registered successfully! Click away to close this modal.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Button from '@/components/elements/button/Button.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import Subtitle from '@/components/typography/Subtitle.vue'

import { hookRegister } from '@/app/hooks/api/auth'
import { promisedBoolRefFalse } from '@/app/utils'
import FetchErrorHandler from '../global/FetchErrorHandler.vue'

export default defineComponent({
  components: {
    Button,
    Subtitle,
    Paragraph,
    FetchErrorHandler,
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
      repeat: '',
      errors: {
        username: null as string | null,
        password: null as string | null,
        repeat: null as string | null,
      },
      registered: false,
    })

    const loading = ref(false)
    const reg = hookRegister(form)

    const validateUsername = () => {
      form.username = form.username.replace(/\s/g, '')
      const is = form.username.length < 6
      form.errors.username = is
        ? 'Username must have at least 6 characters.'
        : null

      return is
    }

    const validatePassword = () => {
      const is = form.password.replace(/\s/g, '').length < 6
      form.errors.password = is
        ? 'Password must have at least 6 characters.'
        : null

      return is
    }

    const validateRepeat = () => {
      const is = form.repeat !== form.password
      console.log({ is, form })
      form.errors.repeat = is
        ? 'Password and Repeat Password must match.'
        : null

      return is
    }

    const validate = () =>
      !validateUsername() && !validatePassword() && !validateRepeat()

    const submitForm = async () => {
      try {
        await promisedBoolRefFalse(reg.request(), loading)
        form.registered = true
      } catch (error) {
        console.log(error)
      }
    }

    return {
      form,
      reg,
      loading,
      submitForm,
      validateUsername,
      validatePassword,
      validateRepeat,
      validate,
    }
  },
})
</script>
