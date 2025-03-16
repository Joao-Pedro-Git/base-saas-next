// validators.ts

export const validateName = (name: string) => {
  if (!name) return "O nome é obrigatório.";
  if (name.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
  return "";
};

export const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email) return "O email é obrigatório.";
  if (!emailPattern.test(email)) return "Por favor, insira um email válido.";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "A senha é obrigatória.";
  if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return "";
};
