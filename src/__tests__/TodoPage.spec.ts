import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import router from "../router";
import todoApi from "../apis/todo";

import TodoPage from "../pages/Todo.vue";

describe("Todo Page", () => {
  it("routes to signin page when user is not signed in", async () => {
    // Given
    vi.spyOn(router, "push");

    // When
    mount(TodoPage, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });

    // Then
    expect(router.push).toHaveBeenCalledWith("/signin");
  });

  it("does not route to signin page when user is signed in", async () => {
    // Given
    vi.spyOn(router, "push");
    const user = {
      uid: "user_uid",
      email: "user@email.com",
      name: "a_user",
      photoUrl: "",
    };
    spyFetchTodoApis();

    // When
    mount(TodoPage, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              user: {
                user,
              },
            },
          }),
        ],
      },
    });

    // Then
    expect(router.push).not.toHaveBeenCalled();
  });
});

function spyFetchTodoApis() {
  const todos = [
    { id: "A", content: "TODO 1", done: false, createdAt: 1665931193264 },
    { id: "B", content: "TODO 2", done: true, createdAt: 1665941193264 },
    { id: "C", content: "TODO 3", done: false, createdAt: 1665951193264 },
  ];
  vi.spyOn(todoApi, "fetchTodos").mockResolvedValue(todos);
}
