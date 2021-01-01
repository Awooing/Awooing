<template>
  <div
    class="mt-3 text-center sm:mt-0 sm:text-left w-full"
    @submit.prevent="submitForm"
  >
    <div class="mb-3" v-if="login.err">
      <fetch-error-handler :error="login.err" />
    </div>
    <subtitle>Login</subtitle>
    <paragraph>Awooing with an account is always better :3</paragraph>
    <form class="mt-4 w-full">
      <div class="mt-2">
        <input
          v-model="form.username"
          type="text"
          placeholder="Your Username"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateUsername"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.username">{{
          form.errors.username
        }}</span>
      </div>
      <div class="mt-4">
        <input
          v-model="form.password"
          type="password"
          placeholder="Your Password"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validatePassword"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.password">{{
          form.errors.password
        }}</span>
      </div>
      <div class="mt-4 mb-2 sm:flex sm:flex-row-reverse">
        <Button
          color="purple-500"
          hoverColor="purple-400"
          px="6"
          py="2"
          type="submit"
          :disabled="loading"
          :loading="loading"
        >
          Login
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Button from '@/components/elements/button/Button.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import Subtitle from '@/components/typography/Subtitle.vue'

import { hookLogin } from '@/app/hooks/api/auth'
import { promisedBoolRefFalse } from '@/app/utils'
import FetchErrorHandler from '../global/FetchErrorHandler.vue'

export type StrOrNull = string | null

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
      errors: {
        username: null as StrOrNull,
        password: null as StrOrNull,
      },
    })

    const loading = ref(false)
    const login = hookLogin(form, true)

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

    const validate = () => !validateUsername() && !validatePassword()

    const submitForm = async () => {
      if (!validate()) return
      try {
        await promisedBoolRefFalse(login.request(), loading)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      form,
      login,
      loading,
      submitForm,
      validateUsername,
      validatePassword,
      validate,
    }
  },
})
</script>
