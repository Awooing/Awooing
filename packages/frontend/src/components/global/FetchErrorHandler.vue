<template>
  <div
    class="px-3 py-2 bg-red-700 rounded-md text-sm text-gray-200"
    v-if="error"
  >
    <span class="mr-2 font-bold bg-red-600 py-1 px-2 rounded-md"
      >{{ formattedKind }} </span
    >{{ error.error.message }}
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import { ErrorKinds } from '@awooing/backend/src/http/helpers/response.helper'
export default defineComponent({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup({ error }) {
    let formattedKind: string

    const kind = error
      ? (error.error.kind as typeof ErrorKinds[keyof typeof ErrorKinds])
      : null

    if (!kind) formattedKind = 'Unknown Error'

    switch (kind) {
      case 'user_input':
        formattedKind = 'Input Error'
        break
      case 'unauthorized':
        formattedKind = 'Unauthorized'
        break
      case 'forbidden':
        formattedKind = 'Forbidden'
        break
      case 'internal':
        formattedKind = 'Internal Error'
        break
      default:
        formattedKind = 'Unknown Error'
        break
    }

    return {
      formattedKind,
    }
  },
})
</script>
