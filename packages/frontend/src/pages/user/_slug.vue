<template>
  <div class="w-full bg-gray-700 px-3 py-5 rounded-md flex">
    <div class="ml-5 flex justify-end h-32">
      <img :src="user.image" alt="" class="w-32 rounded-md mr-4" />
      <div class="h-full flex justify-end" style="flex-flow: column">
        <h2 class="text-gray-300 font-medium text-3xl">{{ user.username }}</h2>
        <p class="text-gray-400">{{ user.description }}</p>
      </div>
    </div>
  </div>

  <div class="mt-6 mb-6">
    <h3 class="text-gray-200 font-normal text-2xl">Profile comments</h3>
  </div>

  <div
    class="w-full border border-gray-600 px-3 py-5 rounded-md flex transition duration-200 ease-in-out hover:bg-gray-900 hover:border-gray-900"
    v-for="(comment, i) in user.comments"
    :key="i"
  >
    <div class="ml-5 flex justify-end items-center min-h-12">
      <img :src="user.image" alt="" class="max-w-16 max-h-16 rounded-md mr-4" />
      <div class="h-full flex justify-end" style="flex-flow: column">
        <span class="text-gray-500"
          >({{ comment.createdAt.toLocaleDateString() }})</span
        >
        <span>
          <router-link
            :to="`/user/${comment.from.slug}`"
            class="text-gray-300 font-medium text-xl"
            >{{ comment.from.username }}</router-link
          >
          wrote:</span
        >
        <p class="text-gray-400 text-sm">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMountedSetTitle } from '@/app/hooks/title'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const user = {
      username: 'Mia',
      description: 'Mia nyaa.',
      image: 'https://via.placeholder.com/500',
      group: 'Awoo Council',
      comments: [
        {
          from: {
            id: '1',
            slug: 'user-1',
            username: 'Miaaa2',
          },
          content: 'Meow',
          createdAt: new Date(),
        },
      ],
    }

    onMountedSetTitle(user.username)

    return {
      user,
    }
  },
})
</script>
