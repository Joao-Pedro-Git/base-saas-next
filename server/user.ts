"use server";

import { auth } from "../src/lib/auth";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "jpfinalbossss@test.com",
      password: "password1s232222",
    },
  });
};

export const signUp = async ({
  name,
  email,
  senha,
}: {
  name: string;
  email: string;
  senha: string;
}) => {
  await auth.api.signUpEmail({
    body: { name, email, password: senha },
  });
};
