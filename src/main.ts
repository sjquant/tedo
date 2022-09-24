import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "virtual:windi.css";
import App from "./App.vue";

createApp(App).use(router).use(createPinia()).mount("#app");
