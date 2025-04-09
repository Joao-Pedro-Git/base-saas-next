"use server";

import { auth } from "../src/lib/auth";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
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
