import { defineStore } from "pinia";
import auth from "../libs/auth";
import type { ProviderName } from "../libs/auth";

import type { Ref } from "vue";
import { ref } from "vue";

interface User {
  name: string;
  email: string;
  photoUrl: string;
}

export const useUserStore = defineStore("user", () => {
  const user: Ref<User | null> = ref(null);
  const accessToken = ref("");
  const refreshToken = ref("");

  async function oauthSignin(providerName: ProviderName) {
    const result = await auth.oauthSignin(providerName);
    user.value = {
      name: result.user.displayName || "",
      email: result.user.email || "",
      photoUrl: result.user.photoURL || "",
    };
    accessToken.value = result.token;
    refreshToken.value = result.user.refreshToken;
  }

  return {
    user,
    oauthSignin,
  };
});
