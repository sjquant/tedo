<template>
  <li class="flex items-center justify-between mb-2">
    <div class="flex items-center">
      <input
        type="checkbox"
        class="mr-2"
        :checked="props.todo.checked"
        @change="emit('check', !props.todo.checked)"
      />
      <div data-test="todo-item" class="text-gray-400">
        {{ props.todo.content }}
      </div>
    </div>
    <div class="flex items-center">
      <button
        data-test="remove-todo-btn"
        class="text-gray-400"
        @click="emit('delete')"
      >
        삭제
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ITodo } from "./todo";

const props = defineProps<{
  todo: ITodo;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "check", checked: boolean): void;
}>();
</script>
