<template>
  <div class="mt-4">
    <TodoItem v-for="todo in props.todos" :key="todo" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todos: string[];
}>();
</script>
