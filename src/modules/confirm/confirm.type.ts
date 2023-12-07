import { IsEmail, IsNotEmpty } from 'class-validator';

export type VerifyParams = {
  email: string;
  type?: string;
  value?: string;
};

export class VerifyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  value: string;
}

export type CreateConfirmParams = {
  email?: string;
  type?: string;
  value?: string;
  information?: string;
};

export type MailerType = {
  template?: string;
  email: string;
  type?: string;
  value?: string;
};
