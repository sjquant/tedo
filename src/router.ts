import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/Todo.vue"),
    },
    {
      path: "/signin",
      component: () => import("./pages/Signin.vue"),
    },
  ],
});

export default router;
