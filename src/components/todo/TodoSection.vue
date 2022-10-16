<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput @confirm="addTodo" />
    <TodoContent :todos="todos" @delete="removeTodo" @check="onChecked" />
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

import { ITodo } from "./todo";
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoContent from "./TodoContent.vue";
import todo from "../../apis/todo";

const router = useRouter();
const { user } = storeToRefs(useUserStore());
const todos: Ref<Array<ITodo>> = useLocalStorage("todos", []);

async function addTodo(content: string) {
  if (!user.value && pickDate(content)) {
    router.push("/signin");
    return;
  }

  if (user.value) {
    await todo.addTodo(user.value.uid, {
      content,
      done: false,
    });
  }
  todos.value.push({ content, done: false });
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
  todos.value[idx].done = checked;
}

watch(
  user,
  async (newUser) => {
    if (!newUser) return;
    if (newUser) {
      const items = await todoApi.fetchTodos(newUser.uid);
      todos.value = items;
    }
  },
  { immediate: true }
);
</script>
