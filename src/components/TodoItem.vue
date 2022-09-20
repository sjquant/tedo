<template>
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center">
      <input type="checkbox" class="mr-2" />
      <div class="text-gray-400">{{ props.todo }}</div>
    </div>
    <div class="flex items-center">
      <button class="text-gray-400 mr-2">Edit</button>
      <button class="text-gray-400">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  todo: string;
}>();
</script>
