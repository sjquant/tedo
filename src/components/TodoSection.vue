<template>
  <div>
    <TodoHeader :date="new Date()" />
    <TodoInput />
  </div>
</template>

<script setup lang="ts">
import TodoInput from "./TodoInput.vue";
import TodoHeader from "./TodoHeader.vue";
</script>
