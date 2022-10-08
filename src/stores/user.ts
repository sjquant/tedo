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

  async function oauthSignin(providerName: ProviderName) {
    const result = await auth.oauthSignin(providerName);
    setUser({
      name: result.user.displayName || "",
      email: result.user.email || "",
      photoUrl: result.user.photoURL || "",
    });
  }

  function setUser(data: User | null) {
    user.value = data;
  }

  return {
    user,
    setUser,
    oauthSignin,
  };
});
