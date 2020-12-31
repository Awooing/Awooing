<template>
  <slot v-if="can" />
</template>

<script lang="ts">
import AllStores from '@/store/allStores'
import { UserRole } from '@awooing/backend/src/db/entity/User'
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    role: {
      type: String,
      default: 'User' as UserRole,
    },
  },
  setup({ role }) {
    const store = useStore<AllStores>()

    const state = reactive({
      can: computed(() =>
        Boolean(store.state.user.user && store.state.user.user.role === role)
      ),
      console,
      JSON,
    })

    return state
  },
})
</script>
