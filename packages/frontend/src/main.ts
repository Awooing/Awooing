/* eslint-disable */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueClickAway from 'vue3-click-away'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(VueClickAway)

app.mount('#app')

if (process.env.NODE_ENV === 'development') {
  console.log('Running Vue', app.version)

  const bindToWindow = (name: string, value: any) =>
    ((window as any)[name] = value)

  bindToWindow('$vue', app)
  bindToWindow('$store', store)
}
