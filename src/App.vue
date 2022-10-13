<template>
  <router-view />
</template>
<script setup lang="ts">
import "./libs/init-firebase";
import { getAuth } from "firebase/auth";
import { useUserStore } from "./stores/user";

const store = useUserStore();
const auth = getAuth();
auth.onAuthStateChanged((user) => {
  if (user) {
    store.setUser({
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoUrl: user.photoURL || "",
    });
  }
});
</script>
