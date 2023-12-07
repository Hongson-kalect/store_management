// Params

export type SigninParams = {
  username: string;
  password: string;
  ipAddress?: string;
  device?: string;
};

export type SignupParams = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type ChangePasswordParams = {
  email: string;
  oldPassword: string;
  password: string;
};

export class RefreshTokenParams {
  token: string;
}

// DTO

export class SigninDto {
  username: string;
  password: string;
  ipAddress?: string;
  device?: string;
}

export class SignupDto {
  email: string;
  username: string;
  phone: string;
  password: string;
}

export class ChangePasswordDto {
  email: string;
  oldPassword: string;
  password: string;
}

export class RefreshTokenDto {
  token: string;
}
