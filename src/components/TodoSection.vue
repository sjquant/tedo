<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput @confirm="addTodo" />
    <TodoContent :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";

const todos = ref<string[]>([]);

function addTodo(todo: string) {
  todos.value.push(todo);
}
</script>
