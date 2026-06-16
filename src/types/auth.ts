export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id?: number;
  id_users?: number;
  id_student?: string;
  student_id?: string;
  full_name?: string;
  nama?: string;
  email?: string;
  role?: string;
  role_id?: number;
};

export type LoginResponse = {
  message?: string;
  token?: string;
  access_token?: string;
  user?: AuthUser;
  data?: {
    token?: string;
    access_token?: string;
    user?: AuthUser;
  };
};


export type RegisterRequest = {
  full_name: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

export type RegisterResponse = {
  message?: string;
  user?: AuthUser;
  data?: AuthUser;
};