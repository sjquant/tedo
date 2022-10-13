import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { User } from "firebase/auth";

export type ProviderName = "google";
interface SigninResult {
  token: string;
  user: User;
}

async function oauthSignin(providerName: ProviderName): Promise<SigninResult> {
  const auth = getAuth();
  const provider = getAuthProvider(providerName);
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) {
    throw new Error("credential not found");
  }
  const token = credential.accessToken || "";
  const user = result.user;
  return {
    token,
    user,
  };
}

function getAuthProvider(name: ProviderName) {
  switch (name) {
    case "google":
      return new GoogleAuthProvider();
    default:
      throw new Error("invalid provider");
  }
}

export default { oauthSignin };
