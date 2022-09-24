import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("./pages/Todo.vue"),
  },
  {
    path: "/signin",
    component: () => import("./pages/Signin.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
