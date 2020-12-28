<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="show">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <modal-shadow />
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        v-click-away="toggle"
      >
        <div class="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ModalShadow from "@/components/elements/modal/ModalShadow.vue"

export default defineComponent({
  components: {
    ModalShadow
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function,
      default: () => false
    }
  }
})
</script>
