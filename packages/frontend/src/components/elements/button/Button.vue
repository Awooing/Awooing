<template>
  <router-link v-if="to" :to="to" :class="classes" :disabled="disabled">
    <button-spinner v-if="loading" />
    <slot />
  </router-link>
  <a v-else-if="href" :href="href" :class="classes" :disabled="disabled">
    <button-spinner v-if="loading" />
    <slot />
  </a>
  <button v-else :href="href" :class="classes" :disabled="disabled">
    <button-spinner v-if="loading" />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ButtonSpinner from './ButtonSpinner.vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'gray-700',
    },
    hoverColor: {
      type: String,
      default: 'gray-600',
    },
    px: {
      type: String,
      default: '3',
    },
    py: {
      type: String,
      default: '2',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ButtonSpinner,
  },
  setup(props) {
    const state = reactive({
      classes: `flex cursor-pointer bg-${props.color} rounded-md px-${props.px} py-${props.py} font-medium text-white hover:bg-${props.hoverColor} transition duration-100 ease-in-out`,
    })
    return state
  },
})
</script>
