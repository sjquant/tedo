import { mount } from "@vue/test-utils";

import TodoSection from "./TodoSection.vue";

describe("TodoSection", () => {
  it("should render new todo on new todo created", async () => {
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
});
