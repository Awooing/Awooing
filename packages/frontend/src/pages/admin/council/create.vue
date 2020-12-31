<template>
  <page-title>New Council Member</page-title>
  <paragraph> Add a new Council awooomember! </paragraph>

  <div class="pt-16">
    <div class="bg-gray-900 p-5 rounded-md">
      <council-member-create-form />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '@/components/typography/PageTitle.vue'
import Card from '@/components/elements/card/CouncilCard.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import { onMountedSetTitle } from '@/app/hooks/title'
import { hookCouncil } from '@/app/hooks/api/council'
import Fetchable from '@/components/global/Fetchable.vue'
import AwooingStopsCard from '@/components/elements/card/AwooingStopsCard.vue'
import { admin } from '@/app/utils'
import CouncilMemberCreateForm from '@/components/forms/admin/CouncilMemberCreateForm.vue'

export default defineComponent({
  name: 'Council',
  components: {
    PageTitle,
    Paragraph,
    CouncilMemberCreateForm,
  },
  setup() {
    onMountedSetTitle(admin('New Council Member'))
  },
})
</script>
