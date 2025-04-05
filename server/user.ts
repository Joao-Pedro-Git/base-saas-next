"use server";

import { auth } from "@/lib/auth";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "jpfinalbossss@test.com",
      password: "password1s232222",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "jptseste@test.com",
      password: "password123s",
      name: " Dev teste",
    },
  });
};
