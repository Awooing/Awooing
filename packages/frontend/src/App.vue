<template>
  <router-view />
</template>

<script lang="ts">
import '@/assets/main.scss'
import { defineComponent } from 'vue'
import { onMountedSetTitle } from '@/app/hooks/title'

export default defineComponent({
  setup() {
    onMountedSetTitle('The Awooing Place')
  },
})
</script>
