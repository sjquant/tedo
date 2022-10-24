<template>
  <TodoSection />
</template>

<script setup lang="ts">
import TodoSection from "../components/todo/TodoSection.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const router = useRouter();
const { user } = storeToRefs(useUserStore());

if (!user.value) {
  router.push("/signin");
}
</script>
