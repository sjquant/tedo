<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput @confirm="addTodo" />
    <TodoContent :todos="todos" @delete="removeTodo" @check="updateDone" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import todoApi from "../../apis/todo";

import type { ITodo } from "./todo";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";

const { user } = storeToRefs(useUserStore());
const todos: Ref<Array<ITodo>> = useLocalStorage("todos", []);

async function addTodo(content: string) {
  let id = Date.now().toString();
  if (user.value) {
    id = await todoApi.addTodo(user.value.uid, content);
  }

  todos.value.push({ id, content, done: false });
}

async function removeTodo(idx: number) {
  const todo = todos.value[idx];

  if (user.value) {
    await todoApi.removeTodo(todo.id);
  }

  todos.value.splice(idx, 1);
}

async function updateDone(idx: number, done: boolean) {
  const todo = todos.value[idx];

  if (user.value) {
    await todoApi.updateDone(todo.id, done);
  }

  todos.value[idx].done = done;
}

watch(
  user,
  async (newUser) => {
    if (!newUser) return;
    const items = await todoApi.fetchTodos(newUser.uid);
    todos.value = items;
  },
  { immediate: true }
);
</script>
