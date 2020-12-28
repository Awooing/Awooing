<template>
  <div :class="`bg-${background} rounded-md columns is-mobile`">
    <div
      class="column is-half justify-start items-center"
      style="display: flex !important"
    >
      <p class="text-2xl text-gray-300">
        <slot />
      </p>
    </div>
    <div
      class="column is-half justify-end items-center"
      style="display: flex !important"
    >
      <img
        class="w-24 h-24 rounded-md"
        :src="AWOOING_STOPS_IMAGE"
        alt="Awooing Stops"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AWOOING_STOPS_IMAGE } from "@/app/utils/constants"
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    background: {
      type: String,
      default: "gray-800"
    }
  },
  setup() {
    return {
      AWOOING_STOPS_IMAGE
    }
  }
})
</script>
