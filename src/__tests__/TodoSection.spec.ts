import { mount, flushPromises, VueWrapper } from "@vue/test-utils";
import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import TodoSection from "../components/todo/TodoSection.vue";
import todoApi from "../apis/todo";

describe("Todo Section", () => {
  beforeEach(() => {
    spyTodoApis();
  });

  it("renders fetched todos when user logged in", async () => {
    // Given
    const store = createLogginedUserStore();

    // When
    const wrapper = await mount(TodoSection, {
      global: {
        plugins: [store],
      },
    });
    await flushPromises();

    // Then
    const todoItems = wrapper.findAll('[data-test="todo-item"]');
    const todoContents = wrapper.findAll('[data-test="todo-item-content"]');
    expect(todoItems.length).toBe(3);
    expect(todoContents[0].text()).toBe("TODO 1");
    expect(todoContents[1].text()).toBe("TODO 2");
    expect(todoContents[2].text()).toBe("TODO 3");
    expect(todoItems[0].find("input").element.checked).toBe(false);
    expect(todoItems[1].find("input").element.checked).toBe(true);
    expect(todoItems[2].find("input").element.checked).toBe(false);
  });

  it("renders the todo when user creates new todo", async () => {
    // Given
    vi.spyOn(todoApi, "fetchTodos").mockResolvedValue([]);
    const store = createLogginedUserStore();
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [store],
      },
    });

    // When
    await addNewTodo(wrapper, "New Todo");
    await flushPromises();

    // Then
    expect(wrapper.find('[data-test="todo-item-content"]').text()).toBe(
      "New Todo"
    );
  });

  it("removes the todo on remove btn clicked and confirmed", async () => {
    // Given
    vi.spyOn(todoApi, "fetchTodos").mockResolvedValue([]);
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const store = createLogginedUserStore();
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [store],
      },
    });
    await addNewTodo(wrapper, "TO BE DELETED");

    // When
    await wrapper.find('[data-test="remove-todo-btn"]').trigger("click");
    await flushPromises();

    // Then
    expect(wrapper.find('[data-test="todo-item"]').exists()).toBe(false);
  });

  it('toggles the todo on "done" checkbox clicked', async () => {
    // Given
    vi.spyOn(todoApi, "fetchTodos").mockResolvedValue([]);
    const store = createLogginedUserStore();
    const wrapper = mount(TodoSection, {
      global: {
        plugins: [store],
      },
    });
    await addNewTodo(wrapper, "TO BE TOGGLED");
    const todoItemCheckbox = wrapper
      .find('[data-test="todo-item"]')
      .find("input");

    // When
    await todoItemCheckbox.trigger("click");
    await flushPromises();

    // Then
    expect(todoItemCheckbox.element.checked).toBe(true);
  });
});

async function addNewTodo(wrapper: VueWrapper, text: string) {
  await wrapper.find('[data-test="new-todo-btn"').trigger("click");
  const inputEl = wrapper.find("input");
  inputEl.setValue(text);
  await inputEl.trigger("keypress.enter");
}

function spyTodoApis() {
  // mock fetch Todos
  const todos = [
    { id: "A", content: "TODO 1", done: false, createdAt: 1665931193264 },
    { id: "B", content: "TODO 2", done: true, createdAt: 1665941193264 },
    { id: "C", content: "TODO 3", done: false, createdAt: 1665951193264 },
  ];
  vi.spyOn(todoApi, "fetchTodos").mockResolvedValue(todos);
  // mock Add Todo
  vi.spyOn(todoApi, "addTodo").mockResolvedValue("A");
  // mock Remove Todo
  vi.spyOn(todoApi, "removeTodo").mockResolvedValue(undefined);
  // mock Update Todo
  vi.spyOn(todoApi, "updateDone").mockResolvedValue(undefined);
}

function createLogginedUserStore() {
  const user = {
    uid: "user_uid",
    email: "user@email.com",
    name: "a_user",
    photoUrl: "",
  };

  return createTestingPinia({
    initialState: {
      user: {
        user,
      },
    },
  });
}
