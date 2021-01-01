<template>
  <footer class="w-full px-3 py-4 bg-gray-50 dark:bg-gray-700">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="columns">
        <div
          class="column items-start justify-center"
          style="display: flex !important; flex-flow: column !important"
        >
          <div class="text-gray-500 dark:text-gray-100 text-2xl">
            Join the
            <a
              href="https://discord.gg/wolke"
              class="text-purple-400 hover:text-purple-500 transition duration-100 ease-in-out"
              >Awoo Discord</a
            >
          </div>
        </div>

        <div
          class="column items-end justify-center"
          style="display: flex !important; flex-flow: column !important"
        >
          <div class="text-gray-400 dark:text-gray-100 text-xl">
            2021 &copy;
            <a
              href="https://awooing.moe"
              target="_blank"
              class="text-purple-400 hover:text-purple-500 transition duration-100 ease-in-out"
              >The Awooing Place</a
            >
            &ndash; All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
