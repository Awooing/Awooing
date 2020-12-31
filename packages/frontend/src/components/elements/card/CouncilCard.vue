<template>
  <div
    class="block rounded-md border border-gray-600 p-4 transition duration-200 ease-in-out cursor-pointer hover:bg-gray-900 hover:border-gray-900"
  >
    <div class="flex flex-grow m-1 items-center">
      <div v-if="image" class="mr-4">
        <img :src="image" class="w-20 h-20 rounded-md" alt="name" />
      </div>

      <div>
        <subtitle>
          {{ name }} <span class="text-gray-400 text-sm">{{ position }}</span>
        </subtitle>
        <paragraph>
          <slot />

          <!-- <div class="mt-3" v-if="profile">
            <Button :to="`/user/${profile}`">Profile</Button>
          </div> -->
        </paragraph>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Paragraph from '@/components/typography/Paragraph.vue'
import Subtitle from '@/components/typography/Subtitle.vue'
import { defineComponent } from 'vue'
import Button from '../button/Button.vue'

export default defineComponent({
  components: { Paragraph, Subtitle, Button },
  props: {
    name: {
      type: String,
      default: 'Unknown',
    },
    image: {
      type: String,
      default:
        'https://cdn.discordapp.com/attachments/687439133148446779/698795294359552000/20200412_032217.png',
    },
    position: {
      type: String,
      default: 'Unknown Position',
    },
    profile: {
      type: String,
      default: 'null',
    },
  },
})
</script>
