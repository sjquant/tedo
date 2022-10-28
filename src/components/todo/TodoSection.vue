<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput @confirm="addTodo" />
    <TodoContent :todos="todos" @delete="removeTodo" @check="updateDone" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import type { User } from "../../stores/user";
import { useUserStore } from "../../stores/user";
import todoApi from "../../apis/todo";

import type { ITodo } from "./todo";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";

const { user } = storeToRefs(useUserStore());
const todos: Ref<Array<ITodo>> = ref([]);

async function addTodo(content: string) {
  let { newContent, todoDate } = _parseContentAndDate(content);
  const id: string = await todoApi.addTodo(
    (user.value as User).uid,
    newContent,
    todoDate
  );

  if (!todoDate || todoDate === todayStr()) {
    todos.value.push({ id, content: newContent, done: false });
  }
}

function _parseContentAndDate(content: string): {
  newContent: string;
  todoDate: string;
} {
  let todoDate: string;
  const matches = content.match(/^날짜:\s*(\d{4}-\d{2}-\d{2})\s+(.*)/);
  let newContent;
  if (matches) {
    todoDate = matches[1];
    newContent = matches[2];
  } else {
    todoDate = "";
    newContent = content;
  }
  return { newContent, todoDate };
}

async function removeTodo(idx: number) {
  const todo = todos.value[idx];
  await todoApi.removeTodo(todo.id);
  todos.value.splice(idx, 1);
}

async function updateDone(idx: number, done: boolean) {
  const todo = todos.value[idx];
  await todoApi.updateDone(todo.id, done);
  todos.value[idx].done = done;
}

watch(
  user,
  async (newUser) => {
    if (!newUser) return;
    const items = await todoApi.fetchTodos(newUser.uid, todayStr());
    todos.value = items;
  },
  { immediate: true }
);

function todayStr(): string {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;
  return todayStr;
}
</script>
