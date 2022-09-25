<template>
  <div class="w-full h-14 border-b sticky top-0">
    <div class="w-full h-full flex justify-between items-center px-4">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full mr-2">
          <img src="../assets/logo.png" alt="로고" />
        </div>
        <div class="text-gray-700 font-bold">Tedo, 기억을 대신하다</div>
      </div>
      <div class="flex items-center">
        <div>
          <div v-if="user">
            <img
              :src="user.photoUrl"
              alt="프로필"
              class="w-8 h-8 rounded-full mr-2 inline"
            />
          </div>
          <router-link to="/signin" v-else>로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const { user } = storeToRefs(useUserStore());
</script>
