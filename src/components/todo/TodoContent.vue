<template>
  <div class="mt-4 px-4">
    <TodoItem
      v-for="(todo, idx) in props.todos"
      :key="idx"
      :todo="todo"
      @check="(checked) => onChecked(idx, checked)"
      @delete="confirmDelete(idx)"
    />
  </div>
</template>

<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import type { ITodo } from "./todo";

const props = defineProps<{
  todos: ITodo[];
}>();
const emit = defineEmits<{
  (e: "delete", idx: number): void;
  (e: "check", idx: number, checked: boolean): void;
}>();

function confirmDelete(idx: number) {
  if (confirm("정말 삭제하시겠습니까?")) {
    emit("delete", idx);
  }
}

function onChecked(idx: number, checked: boolean) {
  emit("check", idx, checked);
}
</script>
