export type UserApi = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type UserModel = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

export const getInitialUserModel = () => ({
  id: -1,
  email: "",
  name: "",
  avatar: "",
});

export const normalizeUser = (from: UserApi): UserModel => ({
  id: from.id,
  email: from.email,
  name: from.name,
  avatar: from.avatar,
});
