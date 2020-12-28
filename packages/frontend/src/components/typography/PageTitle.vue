<template>
  <h1 :class="`text-4xl font-medium text-${color}`"><slot /></h1>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    color: {
      type: String,
      default: "white"
    }
  }
})
</script>
