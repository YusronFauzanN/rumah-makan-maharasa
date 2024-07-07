export type TSignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type TSignupResponse = {
  message?: string;
  id?: number;
  name?: string;
  email?: string;
  error?: string;
};
