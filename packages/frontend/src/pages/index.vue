<template>
  <page-title>Welcome to the Awooing Place</page-title>
  <paragraph
    >The place where we all awoo together. We also appreciate all wholesome and
    cute things :3</paragraph
  >

  <div class="pt-16">
    <div class="columns is-variable is-6">
      <div class="column is-two-thirds">
        <div class="w-full md:mb-0 mb-6">
          <fetchable :hook="articles">
            <template #error>Posts could not be loaded.</template>

            <awooing-stops-card
              v-if="articles.data.posts.length === 0"
              background="gray-700"
            >
              There are no available posts.
            </awooing-stops-card>

            <div v-else>
              <div
                class="mb-3"
                v-for="(post, i) in articles.data.posts"
                :key="i"
              >
                <card
                  v-if="post"
                  :infoFooter="true"
                  :title="post.title"
                  :author="post.author.username"
                  :date="post.date"
                >
                  {{ truncate(post.content) }}...
                </card>
              </div>
              <div class="mt-12 text-right">
                <Button to="/news"> More news </Button>
              </div>
            </div>
          </fetchable>
        </div>
      </div>

      <div
        class="column justify-center md:justify-end"
        style="display: flex !important"
      >
        <discord-widget />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '@/components/typography/PageTitle.vue'
import Card from '@/components/elements/card/BlogCard.vue'
import AwooingStopsCard from '@/components/elements/card/AwooingStopsCard.vue'
import DiscordWidget from '@/components/global/DiscordWidget.vue'
import Button from '@/components/elements/button/Button.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import Fetchable from '@/components/global/Fetchable.vue'
import { onMountedSetTitle } from '@/app/hooks/title'
import { hookArticles } from '@/app/hooks/api/articles'

export default defineComponent({
  name: 'Index',
  components: {
    PageTitle,
    Card,
    DiscordWidget,
    Button,
    Paragraph,
    AwooingStopsCard,
    Fetchable,
  },
  setup() {
    onMountedSetTitle('The Awooing Place')

    const articles = hookArticles({
      perPage: 2,
      currentPage: 1,
    })

    return {
      articles,
      truncate: (text: string): string => text.substring(0, 120),
    }
  },
})
</script>
