<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput @confirm="addTodo" />
    <TodoContent :todos="todos" @delete="removeTodo" @check="onChecked" />
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

import { ITodo } from "./todo";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";

const router = useRouter();
const todos: Ref<Array<ITodo>> = useLocalStorage("todos", []);

function addTodo(content: string) {
  if (pickDate(content)) {
    router.push("/signin");
  }
  todos.value.push({ content, checked: false });
}

function pickDate(content: string) {
  if (!/^날짜: \d{4}-\d{2}-\d{2} /.exec(content)) return null;

  const date = content.split(" ")[1].trim();
  try {
    return new Date(date);
  } catch {
    return null;
  }
}

function removeTodo(idx: number) {
  todos.value.splice(idx, 1);
}

function onChecked(idx: number, checked: boolean) {
  todos.value[idx].checked = checked;
}
</script>
