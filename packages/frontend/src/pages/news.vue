<template>
  <page-title>News</page-title>
  <paragraph
    >This is where all the news are. It can be an announcement, a changelog,
    <br />
    or something from the Awoo Community Discord. We also publish Rin's articles
    here.
  </paragraph>

  <div class="pt-16">
    <div class="w-full md:mb-0 mb-6">
      <fetchable :hook="articles">
        <template #error> Posts could not be loaded. </template>
        <awooing-stops-card
          v-if="articles.data.posts.length === 0"
          background="gray-700"
        >
          There are no available posts.
        </awooing-stops-card>
        <card
          v-else
          v-for="(post, i) in articles.data.posts"
          :key="i"
          :infoFooter="true"
          :title="post.title"
          :author="post.user.username"
          :date="new Date(post.createdAt)"
          :to="`/news/article/${post.slug}`"
          class="mb-4"
        >
          {{ truncate(post.content) }}...
        </card>
      </fetchable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PageTitle from '@/components/typography/PageTitle.vue'
import Card from '@/components/elements/card/BlogCard.vue'
import Paragraph from '@/components/typography/Paragraph.vue'
import { onMountedSetTitle } from '@/app/hooks/title'
import { hookArticles } from '@/app/hooks/api/articles'
import Fetchable from '@/components/global/Fetchable.vue'
import AwooingStopsCard from '@/components/elements/card/AwooingStopsCard.vue'

export default defineComponent({
  name: 'News',
  components: {
    PageTitle,
    Card,
    Paragraph,
    Fetchable,
    AwooingStopsCard,
  },
  setup() {
    const state = reactive({
      perPage: 5,
      currentPage: 1,
    })

    onMountedSetTitle('News')

    const articles = hookArticles({
      perPage: state.perPage,
      currentPage: state.currentPage,
    })

    return {
      state,
      articles,
      truncate: (text: string): string => text.substring(0, 120),
    }
  },
})
</script>
