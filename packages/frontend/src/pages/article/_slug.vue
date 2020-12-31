<template>
  <fetchable :hook="article">
    <template #error
      >Cannot view this post. It either does not exist or is not
      available.</template
    >

    <page-title>{{ article.data.article.title }}</page-title>
    <card-text-footer
      style="justify-content: start !important"
      :author="article.data.article.user.username"
      :date="article.data.article.date"
    />

    <div class="pt-10">
      <div class="bg-gray-700 p-5 rounded-md">
        {{ article.data.article.content }}
      </div>
    </div>
  </fetchable>
</template>


<script lang="ts">
import { hookArticleBySlug } from '@/app/hooks/api/articles'
import { onMountedSetTitle, setPageTitle } from '@/app/hooks/title'
import CardTextFooter from '@/components/elements/card/CardTextFooter.vue'
import Fetchable from '@/components/global/Fetchable.vue'
import PageTitle from '@/components/typography/PageTitle.vue'
import Subtitle from '@/components/typography/Subtitle.vue'
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  components: { Fetchable, PageTitle, CardTextFooter },
  props: {
    slug: { type: String, default: '' },
  },
  setup({ slug }) {
    onMountedSetTitle('View Article')

    const article = hookArticleBySlug(slug)

    watch(
      () => article.fetch,
      val => {
        if (val === null) setPageTitle('Loading Article...')
        if (val === false) setPageTitle('Article not Found')
        if (article.data) setPageTitle(article.data.article.title)
      },
      { immediate: true }
    )

    return {
      article,
    }
  },
})
</script>