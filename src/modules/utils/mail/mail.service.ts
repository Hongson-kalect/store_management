import { HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserSevices } from '../../users/user.service';
import { v4 as uuidv4 } from 'uuid';

import { ConfirmService } from '../../confirm/confirm.service';
import { MailerType } from './mail.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userServices: UserSevices,
    private readonly confirmService: ConfirmService,
  ) {}

  async mailer({ email, type, template, params }: MailerType) {
    let isSuccess = false;
    const validateNumber = Math.floor(10000 + Math.random() * 90000);

    if (type === 'newDevice') {
      const validateString = uuidv4();
      await this.mailerService
        .sendMail({
          to: email, // sender address
          from: process.env.EMAIL_HOST, // list of receivers
          subject: 'Cảnh báo bảo mật',
          template: template ? './' + template : './newDevice', // Subject line
          context: {
            email,
            validateString,
            device: params.device,
          },
        })
        .then(() => {
          isSuccess = true;
        })
        .catch((error: any) => {
          console.log(error);
          throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        });

      await this.confirmService.createConfirm({
        email: email,
        type,
        value: validateString,
        information: JSON.stringify({ device: params.device }),
      });
      return true;
    }

    const user = await this.userServices.getUserByEmail(email);
    if (type === 'signUp') {
      console.log('email: ', email);
      if (user)
        throw new HttpException('Tài khoản đã tồn tại', HttpStatus.CONFLICT);

      await this.mailerService
        .sendMail({
          to: email, // sender address
          from: process.env.EMAIL_HOST, // list of receivers
          subject: 'Xác nhận tài khoản',
          template: template ? './' + template : './signUp', // Subject line
          context: {
            email,
            validateNumber,
          },
        })
        .then(() => {
          isSuccess = true;
        })
        .catch((error: any) => {
          console.log(error);
          throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        });
    } else if (type === 'resetPassword') {
      if (!user)
        throw new HttpException(
          'Tài khoản không tồn tại',
          HttpStatus.NOT_FOUND,
        );

      // await this.mailerService
      //   .sendMail({
      //     to: email, // sender address
      //     from: process.env.EMAIL_HOST, // list of receivers
      //     subject: 'Xác nhận tài khoản',
      //     template: template ? './' + template : './resetPassword', // Subject line
      //     context: {
      //       email,
      //       validateNumber,
      //     },
      //   })
      //   .then(() => {
      //     isSuccess = true;
      //   })
      //   .catch((error: any) => {
      //     console.log(error);
      //     throw new HttpException('Error', HttpStatus.BAD_REQUEST);
      //   });

      await this.confirmService.createConfirm({
        email,
        type,
        value: validateNumber.toString(),
      });
    }

    // if (!isSuccess)
    //   throw new HttpException('send mail fail', HttpStatus.NOT_ACCEPTABLE);
    await this.confirmService.createConfirm({
      email: email,
      type,
      value: validateNumber.toString(),
    });

    return isSuccess;
  }
}
