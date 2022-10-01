import { mount } from "@vue/test-utils";
import { vi } from "vitest";

import TodoSection from "../components/todo/TodoSection.vue";

describe("TodoSection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the todo on user creates new todo", async () => {
    // Given
    const wrapper = mount(TodoSection);
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
    const wrapper = mount(TodoSection);
    await wrapper.find('[data-test="new-todo-btn"').trigger("click");
    const inputEl = wrapper.find("input");
    inputEl.setValue("New todo");
    await inputEl.trigger("keypress.enter");

    // When
    await wrapper.find('[data-test="remove-todo-btn"]').trigger("click");

    // Then
    expect(wrapper.find('[data-test="todo-item"]').exists()).toBe(false);
  });

  it("renders saved todos on mounted", async () => {
    // Given
    const todos = [
      { content: "TODO 1", checked: false },
      { content: "TODO 2", checked: true },
      { content: "TODO 3", checked: false },
    ];
    localStorage.setItem("todos", JSON.stringify(todos));

    // When
    const wrapper = await mount(TodoSection);

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
