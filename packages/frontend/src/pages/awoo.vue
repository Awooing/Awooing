<template>
  <page-title>Random Awoo</page-title>
  <paragraph>
    This page shows a random image with each refresh. It’s not limited to
    Momiji, every wholesome kemonomimi is welcome.
  </paragraph>

  <div class="pt-16 flex justify-center">
    <div class="block w-full">
      <fetchable :hook="awoo">
        <template #error> Random Awoo could not be loaded. </template>

        <div class="flex w-full justify-center">
          <img
            @click.exact="loadImage"
            @click.shift="copyImageLink"
            :src="makeCdnUrl(awoo.data.awoo.path)"
            alt="This image link seems to be dead. Click again to load another image."
            class="cursor-pointer max-h-96"
          />
        </div>
      </fetchable>
      <div
        v-if="awoo.data && state.previousAwoo.length !== 0"
        class="mt-8 text-center flex w-full justify-center"
      >
        <Button @click="setPreviousAwoo">Previous Awoo</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from '@/components/elements/button/Button.vue'
import PageTitle from '@/components/typography/PageTitle.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import { defineComponent, reactive } from 'vue'
import { onMountedSetTitle } from '@/app/hooks/title'
import { CdnFile } from '@awooing/backend/src/fetchers/cdn.fetcher'
import { hookRandomImage } from '@/app/hooks/api/awoo'
import Fetchable from '@/components/global/Fetchable.vue'

export default defineComponent({
  components: {
    Paragraph,
    PageTitle,
    Button,
    Fetchable,
  },
  setup() {
    const state = reactive({
      previousAwoo: [] as CdnFile[],
    })

    const awoo = hookRandomImage()

    const makeCdnUrl = (path: string): string =>
      path.startsWith('http') ? path : `https://cdn.awooing.moe/${path}`

    const loadImage = async (): Promise<void> => {
      if (awoo.data) state.previousAwoo.push(awoo.data.awoo)
      await awoo.request()
    }

    const setPreviousAwoo = async (): Promise<void> => {
      if (state.previousAwoo.length < 1) return

      const previous = state.previousAwoo[state.previousAwoo.length - 1]
      state.previousAwoo = state.previousAwoo.filter(
        img => img.path !== previous.path
      )
      awoo.data = { awoo: previous }
    }

    const copyImageLink = async (): Promise<void> => {
      if (!awoo.data) return
      return navigator.clipboard.writeText(makeCdnUrl(awoo.data.awoo.path))
    }

    onMountedSetTitle('Random Awoo')

    return {
      loadImage,
      setPreviousAwoo,
      copyImageLink,
      makeCdnUrl,
      state,
      awoo,
    }
  },
})
</script>
