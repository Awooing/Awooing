<template>
  <div
    class="mt-3 text-center sm:mt-0 sm:text-left w-full"
    @submit.prevent="submitForm"
  >
    <form class="mt-4 w-full">
      <div class="mt-2">
        <input
          v-model="form.name"
          type="text"
          placeholder="Member Name"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateName"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.name">{{
          form.errors.name
        }}</span>
      </div>
      <div class="mt-2">
        <input
          v-model="form.role"
          type="text"
          placeholder="Member Role"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateRole"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.role">{{
          form.errors.role
        }}</span>
      </div>
      <div class="mt-4">
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateDescription"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.description">{{
          form.errors.description
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
          Create
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
import { hookCreateMember } from '@/app/hooks/api/council'

export type StrOrNull = string | null

export default defineComponent({
  components: {
    Button,
    Subtitle,
    Paragraph,
  },
  setup() {
    const form = reactive({
      name: '',
      description: '',
      role: '',
      errors: {
        name: null as StrOrNull,
        role: null as StrOrNull,
        description: null as StrOrNull,
      },
    })

    const loading = ref(false)
    const login = hookCreateMember(form, true)

    const validateName = () => {
      const is = form.name.replace(/\s/g, '').length < 1
      form.errors.name = is ? 'Name cannot be empty.' : null

      return is
    }

    const validateRole = () => {
      const is = form.role.replace(/\s/g, '').length < 5
      form.errors.role = is ? 'Role must be at least 5 characters long.' : null

      return is
    }

    const validateDescription = () => {
      const is = form.description.replace(/\s/g, '').length < 5
      form.errors.description = is
        ? 'Description must be at least 5 characters long.'
        : null

      return is
    }

    const validate = () =>
      !validateName() && !validateRole() && !validateDescription()

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
      validateName,
      validateDescription,
      validateRole,
      validate,
    }
  },
})
</script>
