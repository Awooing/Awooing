<template>
  <h1 :class="`text-5xl font-medium leading-tight text-${color}`"><slot /></h1>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    color: {
      type: String,
      default: "gray-100"
    }
  }
})
</script>
