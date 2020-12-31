<template>
  <h2 :class="`text-2xl title-font font-medium text-${color} cursor-text`">
    <slot />
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'gray-100',
    },
  },
})
</script>
