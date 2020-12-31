<template>
  <p :class="`leading-relaxed text-sm text-justify text-${color} cursor-text`">
    <slot />
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'gray-300',
    },
  },
})
</script>
