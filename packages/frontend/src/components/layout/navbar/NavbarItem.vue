<template>
  <!-- block px-3 py-2 rounded-md text-base font-medium text-gray-100 bg-gray-700 -->
  <router-link
    v-if="to"
    :to="to"
    exact-active-class="bg-gray-100 dark:bg-gray-700"
    class="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition duration-100 ease-in-out"
    :class="mobile && 'block'"
    :exact="true"
    ><slot
  /></router-link>
  <a
    v-else
    :href="href"
    class="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition duration-100 ease-in-out"
    :class="mobile && 'block'"
    ><slot
  /></a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: '#',
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
