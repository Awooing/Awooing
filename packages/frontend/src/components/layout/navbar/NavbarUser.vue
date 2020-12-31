<template>
  <div class="flex" v-if="!authenticated">
    <span class="mr-3">
      <Button @click="toggleLogin">Login</Button>
    </span>
    <Button @click="toggleRegister">Register</Button>
  </div>
  <div class="flex" v-else>
    <div class="relative">
      <Button @click="state.dropdownShown = !state.dropdownShown">{{
        user.username
      }}</Button>
      <dropdown
        class="w-36"
        :class="{ block: state.dropdownShown, hidden: !state.dropdownShown }"
      >
        <dropdown-item class="cursor-not-allowed">
          <div class="flex justify-between items-center">
            <span><cog class="w-5 h-5" /></span>
            <span>Settings</span>
          </div>
        </dropdown-item>
        <dropdown-item class="cursor-pointer" @click="logout">
          <div class="flex justify-between items-center">
            <span><logout class="w-5 h-5" /></span>
            <span>Logout</span>
          </div>
        </dropdown-item>
      </dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import AllStores from '@/store/allStores'
import Button from '@/components/elements/button/Button.vue'
import DropdownItem from '@/components/elements/dropdown/DropdownItem.vue'
import Dropdown from '@/components/elements/dropdown/Dropdown.vue'
import Cog from '@/components/icons/Cog.vue'
import Logout from '@/components/icons/Logout.vue'
import { removeToken } from '@/app/hooks/localStorage/auth'
import { frmt } from '@awooing/backend/src/console'

export default defineComponent({
  components: {
    Button,
    DropdownItem,
    Dropdown,
    Logout,
    Cog,
  },
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
    toggleLogin: {
      type: Function,
      default: () => {},
    },
    toggleRegister: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const store = useStore<AllStores>()

    const state = reactive({
      dropdownShown: false,
    })

    const logout = () => {
      console.log(frmt('Logged out'))
      removeToken(true)
    }

    return {
      authenticated: computed(() => store.state.user.authenticated),
      user: computed(() => store.state.user.user),
      state,
      logout,
    }
  },
})
</script>