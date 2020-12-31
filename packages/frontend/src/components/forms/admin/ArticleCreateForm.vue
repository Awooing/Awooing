<template>
  <div
    class="mt-3 text-center sm:mt-0 sm:text-left w-full"
    @submit.prevent="submitForm"
  >
    <form class="mt-4 w-full">
      <div class="mt-2">
        <input
          v-model="form.title"
          type="text"
          placeholder="Article Title"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateTitle"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.title">{{
          form.errors.title
        }}</span>
      </div>
      <div class="mt-4">
        <textarea
          v-model="form.content"
          placeholder="Article Content"
          class="block w-full py-2 px-4 sm:text-sm bg-gray-700 border-gray-300 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:border-purple-500 transition duration-150 ease-in-out"
          @keyup="validateContent"
        />
        <span class="text-red-600 text-xs" v-if="form.errors.content">{{
          form.errors.content
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
import { hookCreateArticle } from '@/app/hooks/api/articles'

export type StrOrNull = string | null

export default defineComponent({
  components: {
    Button,
    Subtitle,
    Paragraph,
  },
  setup() {
    const form = reactive({
      title: '',
      content: '',
      errors: {
        title: null as StrOrNull,
        content: null as StrOrNull,
      },
    })

    const loading = ref(false)
    const login = hookCreateArticle(form, true)

    const validateTitle = () => {
      const is = form.title.replace(/\s/g, '').length < 4

      form.errors.title = is
        ? 'Title must be at least 5 characters long.'
        : null

      return is
    }

    const validateContent = () => {
      const is = form.content.replace(/\s/g, '').length < 5
      form.errors.content = is
        ? 'Article Content must be at least 5 characters long.'
        : null

      return is
    }

    const validate = () => !validateTitle() && !validateContent()

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
      validateTitle,
      validateContent,
      validate,
    }
  },
})
</script>
