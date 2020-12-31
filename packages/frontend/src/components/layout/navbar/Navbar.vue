<template>
  <nav class="bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="block md:hidden">
            <Button @click="toggleMenu">Menu</Button>
          </div>
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <navbar-item to="/"> Home </navbar-item>
              <navbar-item to="/news">News</navbar-item>
              <navbar-item to="/council">Council</navbar-item>
              <navbar-item to="/awoo">Random Awoo</navbar-item>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <navbar-user
              :toggleLogin="toggleLogin"
              :toggleRegister="toggleRegister"
            />
          </div>
        </div>
      </div>
    </div>

    <div :class="state.menuOpen ? `block` : `hidden`" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <navbar-item to="/" :mobile="true"> Home </navbar-item>
        <navbar-item to="/news" :mobile="true">News</navbar-item>
        <navbar-item to="/council" :mobile="true">Council</navbar-item>
        <navbar-item to="/awoo" :mobile="true">Random Awoo</navbar-item>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700 flex justify-center">
        <navbar-user
          :toggleLogin="toggleLogin"
          :toggleRegister="toggleRegister"
          :mobile="true"
        />
      </div>
    </div>
  </nav>

  <modal :show="state.showLogin" :toggle="toggleLogin">
    <login-form />
  </modal>

  <modal :show="state.showRegister" :toggle="toggleRegister">
    <register-form />
  </modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

import NavbarItem from './NavbarItem.vue'
import NavbarUser from './NavbarUser.vue'

import Modal from '@/components/elements/modal/Modal.vue'
import Button from '@/components/elements/button/Button.vue'

import LoginForm from '@/components/forms/LoginForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'

import Dropdown from '@/components/elements/dropdown/Dropdown.vue'
import DropdownItem from '@/components/elements/dropdown/DropdownItem.vue'

import Cog from '@/components/icons/Cog.vue'
import Logout from '@/components/icons/Logout.vue'

import userStore, { UserState } from '@/store/modules/user'

import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Modal,
    NavbarItem,
    Button,
    LoginForm,
    RegisterForm,
    Dropdown,
    DropdownItem,
    Cog,
    Logout,
    NavbarUser,
  },
  setup() {
    const state = reactive({
      menuOpen: false,
      showLogin: false,
      showRegister: false,
    })

    const toggleMenu = () => (state.menuOpen = !state.menuOpen)
    const toggleLogin = () => (state.showLogin = !state.showLogin)
    const toggleRegister = () => (state.showRegister = !state.showRegister)

    return {
      toggleMenu,
      toggleLogin,
      toggleRegister,
      state,
    }
  },
})
</script>
