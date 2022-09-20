<template>
  <div class="mt-4 px-4">
    <TodoItem
      v-for="(todo, idx) in props.todos"
      :key="todo"
      :todo="todo"
      @delete="confirmDelete(idx)"
    />
  </div>
</template>

<script setup lang="ts">
import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todos: string[];
}>();
const emit = defineEmits<{
  (e: "delete", idx: number): void;
}>();

function confirmDelete(idx: number) {
  if (confirm("정말 삭제하시겠습니까?")) {
    emit("delete", idx);
  }
}
</script>
