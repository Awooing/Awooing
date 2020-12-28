import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"
import VueClickAway from "vue3-click-away"

const app = createApp(App)

console.log("Running Vue", app.version)

app
  .use(store)
  .use(router)
  .use(VueClickAway)

app.mount("#app")
