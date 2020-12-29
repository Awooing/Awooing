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
  // eslint-disable-next-line no-console
  console.log('Running Vue', app.version)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bindToWindow = (name: string, value: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((window as any)[name] = value)

  bindToWindow('$vue', app)
  bindToWindow('$store', store)
}
