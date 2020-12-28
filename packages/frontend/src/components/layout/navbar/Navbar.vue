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
            <div class="flex">
              <span class="mr-3">
                <Button @click="toggleLogin">Login</Button>
              </span>
              <Button @click="toggleRegister">Register</Button>
            </div>
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
        <div class="flex">
          <span class="mr-3">
            <Button @click="toggleLogin">Login</Button>
          </span>
          <Button @click="toggleRegister">Register</Button>
        </div>
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
import Button from "@/components/elements/button/Button.vue"
import { defineComponent, reactive } from "vue"
import NavbarItem from "./NavbarItem.vue"
import Modal from "@/components/elements/modal/Modal.vue"

import LoginForm from "@/components/forms/LoginForm.vue"
import RegisterForm from "@/components/forms/RegisterForm.vue"

export default defineComponent({
  components: {
    Modal,
    NavbarItem,
    Button,
    LoginForm,
    RegisterForm
  },
  setup() {
    const state = reactive({
      menuOpen: false,
      showLogin: false,
      showRegister: false
    })

    const toggleMenu = () => (state.menuOpen = !state.menuOpen)
    const toggleLogin = () => (state.showLogin = !state.showLogin)
    const toggleRegister = () => (state.showRegister = !state.showRegister)

    return {
      toggleMenu,
      toggleLogin,
      toggleRegister,
      state
    }
  }
})
</script>
