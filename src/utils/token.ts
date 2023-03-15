const AUTH_TOKEN_KEY = "e-commerce_token";

export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  return token ?? "";
};

export const saveToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};
