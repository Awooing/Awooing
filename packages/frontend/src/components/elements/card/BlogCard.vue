<template>
  <router-link
    :to="to"
    class="block rounded-md bg-gray-700 p-4 transition duration-200 ease-in-out cursor-pointer transform hover:scale-95"
  >
    <div class="flex-grow p-2 mt-3">
      <subtitle> {{ title }} </subtitle>
      <paragraph>
        <slot />
      </paragraph>

      <card-text-footer v-if="infoFooter" :author="author" :date="date" />

      <div class="mt-6" v-if="image">
        <img :src="image" alt="" class="rounded-md" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Paragraph from '@/components/typography/Paragraph.vue'
import Subtitle from '@/components/typography/Subtitle.vue'
import { defineComponent } from 'vue'
import CardTextFooter from './CardTextFooter.vue'

export default defineComponent({
  components: { Paragraph, CardTextFooter, Subtitle },
  props: {
    image: {
      type: Boolean,
      default: null,
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    to: {
      type: String,
      default: '#',
    },
    infoFooter: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      default: 'Unknown',
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
})
</script>
