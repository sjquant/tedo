import { h } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

export function createFakeRouter(path: string) {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        component: {
          render() {
            return h("div");
          },
        },
      },
      {
        path,
        component: {
          render: () => h("div"),
        },
      },
    ],
  });
}
