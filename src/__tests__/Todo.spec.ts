import { mount, flushPromises } from "@vue/test-utils";
import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import TodoSection from "../components/todo/TodoSection.vue";
import todoApi from "../apis/todo";

describe("TodoSection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the todo on user creates new todo", async () => {
    // Given
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    await wrapper.find('[data-test="new-todo-btn"').trigger("click");

    // When
    const inputEl = wrapper.find("input");
    inputEl.setValue("New todo");
    await inputEl.trigger("keypress.enter");

    // Then
    expect(wrapper.find('[data-test="todo-item"]').text()).toBe("New todo");
  });

  it("removes the todo on remove btn clicked and confirmed", async () => {
    // Given
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    await wrapper.find('[data-test="new-todo-btn"').trigger("click");
    const inputEl = wrapper.find("input");
    inputEl.setValue("New todo");
    await inputEl.trigger("keypress.enter");

    // When
    await wrapper.find('[data-test="remove-todo-btn"]').trigger("click");

    // Then
    expect(wrapper.find('[data-test="todo-item"]').exists()).toBe(false);
  });

  it("renders locally-saved todos on mounted", async () => {
    // Given
    const todos = [
      { id: "A", content: "TODO 1", done: false },
      { id: "B", content: "TODO 2", done: true },
      { id: "C", content: "TODO 3", done: false },
    ];
    localStorage.setItem("todos", JSON.stringify(todos));

    // When
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Then
    const todoItems = wrapper.findAll('[data-test="todo-item"]');
    const inputs = wrapper.findAll("input");
    expect(todoItems.length).toBe(3);
    expect(inputs.length).toBe(3);
    expect(todoItems[0].text()).toBe("TODO 1");
    expect(todoItems[1].text()).toBe("TODO 2");
    expect(todoItems[2].text()).toBe("TODO 3");
    expect(inputs[0].element.checked).toBe(false);
    expect(inputs[1].element.checked).toBe(true);
    expect(inputs[2].element.checked).toBe(false);
  });

  it("renders remotely-saved todos when user logged in", async () => {
    // Given
    const todos = [
      { id: "A", content: "TODO 1", done: false, createdAt: 1665931193264 },
      { id: "B", content: "TODO 2", done: true, createdAt: 1665941193264 },
      { id: "C", content: "TODO 3", done: false, createdAt: 1665951193264 },
    ];
    vi.spyOn(todoApi, "fetchTodos").mockResolvedValue(todos);
    const user = {
      uid: "user_uid",
      email: "user@email.com",
      name: "a_user",
      photoUrl: "",
    };

    // When
    const wrapper = await mount(TodoSection, {
      global: {
        plugins: [
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
    await flushPromises();

    // Then
    const todoItems = wrapper.findAll('[data-test="todo-item"]');
    const inputs = wrapper.findAll("input");
    expect(todoItems.length).toBe(3);
    expect(inputs.length).toBe(3);
    expect(todoItems[0].text()).toBe("TODO 1");
    expect(todoItems[1].text()).toBe("TODO 2");
    expect(todoItems[2].text()).toBe("TODO 3");
    expect(inputs[0].element.checked).toBe(false);
    expect(inputs[1].element.checked).toBe(true);
    expect(inputs[2].element.checked).toBe(false);
  });
});
