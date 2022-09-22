<template>
  <div class="flex justify-center mb-4">
    <div>
      <div class="text-3xl text-center mb-1">{{ day }}</div>
      <div class="text-gray-400">{{ dateString }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  date: Date;
}>();

const dateString = computed(() => {
  return props.date.toLocaleDateString();
});

const day = computed(function () {
  return props.date.toLocaleDateString("ko-KR", {
    weekday: "long",
  });
});
</script>
