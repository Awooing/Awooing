<template>
  <div v-if="hook.fetch === null" class="w-full flex justify-center">
    <loader />
  </div>
  <awooing-stops-card
    v-else-if="hook.fetch === false"
    background="red-800"
    @click="hook.request"
  >
    <slot name="error" />
  </awooing-stops-card>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AwooingStopsCard from '../elements/card/AwooingStopsCard.vue'
import Loader from './Loader.vue'

export default defineComponent({
  props: ['hook'],
  components: {
    Loader,
    AwooingStopsCard,
  },
})
</script>
