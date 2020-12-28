<template>
  <page-title>Council</page-title>
  <paragraph
    >This is the council that has won the election on 29th of April, 2020. They
    are in charge of adding new awoo emotes to the Discord server and other
    duties.
  </paragraph>

  <div class="pt-16">
    <div class="w-full md:mb-0 mb-6">
      <fetchable :hook="council">
        <template #error> Council members could not be loaded. </template>
        <awooing-stops-card
          v-if="council.data.members.length === 0"
          background="gray-700"
        >
          There are no members. Wait, wha-
        </awooing-stops-card>
        <card
          v-for="(member, i) in council.data.members"
          :key="i"
          :name="member.name"
          :image="member.image"
        >
          {{ member.description }}
        </card>
      </fetchable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageTitle from "@/components/typography/PageTitle.vue"
import Card from "@/components/elements/card/CouncilCard.vue"
import Paragraph from "@/components/typography/Paragraph.vue"
import { onMountedSetTitle } from "@/app/hooks/title"
import { hookCouncil } from "@/app/hooks/api/council"
import Fetchable from "@/components/global/Fetchable.vue"
import AwooingStopsCard from "@/components/elements/card/AwooingStopsCard.vue"

export default defineComponent({
  name: "Council",
  components: {
    PageTitle,
    Card,
    Paragraph,
    Fetchable,
    AwooingStopsCard
  },
  setup() {
    onMountedSetTitle("Awoo Council")

    const council = hookCouncil()

    return {
      council
    }
  }
})
</script>
