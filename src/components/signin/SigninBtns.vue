<template>
  <div>
    <button
      class="w-md bg-neutral-100 hover:bg-neutral-200 text-gray py-2 rounded"
      data-test="google-signin-btn"
      @click="signInWithGoogle"
    >
      구글로 3초만에 시작하기 😎
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const router = useRouter();
const userStore = useUserStore();

async function signInWithGoogle() {
  try {
    await userStore.oauthSignin("google");
    router.push("/");
  } catch {
    alert("로그인에 실패했습니다.");
  }
}
</script>
