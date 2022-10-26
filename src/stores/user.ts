import { defineStore } from "pinia";
import auth from "../apis/auth";
import type { ProviderName } from "../apis/auth";

import type { Ref } from "vue";
import { ref } from "vue";

export interface User {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
}

export enum UserState {
  NotDetermined,
  NotSignedIn,
  SignedIn,
}

export const useUserStore = defineStore("user", () => {
  const user: Ref<User | null> = ref(null);
  const userState: Ref<UserState> = ref(UserState.NotDetermined);

  async function oauthSignin(providerName: ProviderName) {
    try {
      const result = await auth.oauthSignin(providerName);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName || "",
        email: result.user.email || "",
        photoUrl: result.user.photoURL || "",
      });
      setUserState(UserState.SignedIn);
    } catch {
      setUser(null);
      setUserState(UserState.NotSignedIn);
    }
  }

  function setUser(data: User | null) {
    user.value = data;
  }

  function setUserState(state: UserState) {
    userState.value = state;
  }

  return {
    user,
    userState,
    setUser,
    oauthSignin,
  };
});
