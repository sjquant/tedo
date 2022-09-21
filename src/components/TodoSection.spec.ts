import { mount } from "@vue/test-utils";
import { vi } from "vitest";

import TodoSection from "./TodoSection.vue";

describe("TodoSection", () => {
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
});
