<template>
  <div
    class="block rounded-md border border-gray-600 p-4 transition duration-200 ease-in-out cursor-pointer hover:bg-gray-900 hover:border-gray-900"
  >
    <div class="flex flex-grow m-1">
      <div v-if="image" class="mr-4">
        <img :src="image" alt="" class="rounded-md" />
      </div>

      <div>
        <subtitle> {{ name }} </subtitle>
        <paragraph>
          <slot />

          <div class="mt-3" v-if="profile">
            <Button :to="`/user/${profile}`">Profile</Button>
          </div>
        </paragraph>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Paragraph from "@/components/typography/Paragraph.vue"
import Subtitle from "@/components/typography/Subtitle.vue"
import { defineComponent } from "vue"
import Button from "../button/Button.vue"

export default defineComponent({
  components: { Paragraph, Subtitle, Button },
  props: {
    name: {
      type: String,
      default: "Unknown"
    },
    image: {
      type: String,
      default:
        "https://cdn.discordapp.com/avatars/162325985079984129/1a2a13c4e3eb751121cdd076e86580b6"
    },
    description: {
      type: String,
      default: "The description could not be loaded."
    },
    profile: {
      type: String,
      default: "null"
    }
  }
})
</script>
