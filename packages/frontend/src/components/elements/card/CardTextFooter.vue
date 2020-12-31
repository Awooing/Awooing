<template>
  <div class="mt-3 mb-3 w-full flex justify-end text-gray-400 cursor-text">
    Author:
    <span class="text-gray-300 ml-1 mr-1 cursor-pointer font-medium">{{
      author
    }}</span>
    &ndash; Date:
    <span class="text-gray-300 ml-1">{{
      date.toLocaleDateString() +
      ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    date: {
      type: Date,
      default: new Date(),
    },
    author: {
      type: String,
      default: 'Unknown',
    },
  },
  setup() {
    return {
      pad: (num: number) => (String(num).length === 1 ? `0${num}` : num),
    }
  },
})
</script>
