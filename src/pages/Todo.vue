<template>
  <div class="todo">
    <h1>Todo</h1>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const newTodo = ref("");
const todos = ref(["Learn Vue 3", "Learn Vite"]);

function addTodo() {
  todos.value.push(newTodo.value);
  newTodo.value = "";
}
</script>
