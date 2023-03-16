export const getEmailError = (email: string): string | null => {
  if (!email) {
    return "Email is required";
  }

  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }

  return null;
};

export const getPasswordError = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  }

  return null;
};
