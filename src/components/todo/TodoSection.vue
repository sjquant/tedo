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

import { ITodo } from "./todo";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";

const todos: Ref<Array<ITodo>> = useLocalStorage("todos", []);

function addTodo(todo: string) {
  todos.value.push({ content: todo, checked: false });
}

function removeTodo(idx: number) {
  todos.value.splice(idx, 1);
}

function onChecked(idx: number, checked: boolean) {
  todos.value[idx].checked = checked;
}
</script>
