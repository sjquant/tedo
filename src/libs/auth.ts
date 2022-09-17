import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
  url: "http://localhost:5173/auth/sign-in/email",
  handleCodeInApp: true,
};

const auth = getAuth();

export const sendSignInLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  } catch (error) {
    console.error(error);
  }
};
