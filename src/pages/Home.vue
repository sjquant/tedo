<template>
  <GlobalNav />
  <div class="w-full flex justify-center mt-20">
    <div class="min-w-md md:w-screen-sm px-4">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import GlobalNav from "../components/GlobalNav.vue";
</script>
