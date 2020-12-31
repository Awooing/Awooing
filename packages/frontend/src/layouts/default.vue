<template>
  <navbar />

  <header class="bg-purple-500 shadow relative">
    <hero>
      <div class="max-w-7xl columns px-4 sm:px-6 lg:px-8 w-full">
        <div
          class="column is-half justify-center md:justify-start md:items-center"
          style="display: flex !important"
        >
          <hero-title> {{ state.title }} </hero-title>
        </div>
        <div
          class="column is-half justify-center md:justify-end md:items-center"
          style="display: flex !important"
        >
          <img
            class="w-48"
            src="https://cdn.discordapp.com/attachments/687439133148446779/698795294359552000/20200412_032217.png"
          />
        </div>
      </div>
    </hero>
  </header>

  <main class="min-h-screen pb-6 m-4 md:m-0">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="pt-8">
        <router-view />
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
.column {
  padding: 1 !important;
  &:nth-child(1) {
    padding-left: 0;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

import Footer from '@/components/layout/Footer.vue'
import Hero from '@/components/elements/hero/Hero.vue'
import HeroTitle from '@/components/typography/HeroTitle.vue'
import Navbar from '@/components/layout/navbar/Navbar.vue'
import store from '@/store'

export default defineComponent({
  components: {
    Footer,
    Hero,
    HeroTitle,
    Navbar,
  },
  setup() {
    const state = reactive({
      title: computed(() => store.state.title),
    })

    return {
      state,
    }
  },
})
</script>
