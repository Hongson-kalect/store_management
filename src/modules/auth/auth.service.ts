import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserSevices } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/User';
import { Repository } from 'typeorm';
import { SigninParams, SignupParams } from './auth.type';
import { AppJwtService } from '../utils/jwt/jwt.service';
import { Device } from 'src/typeOrm/entities/Device';
import { MailService } from '../utils/mail/mail.service';
import { Confirm } from 'src/typeOrm/entities/Confirm';
import { LoginHistoryService } from '../LoginHistory/loginHistory.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserSevices,
    private appJwtService: AppJwtService,
    private mailService: MailService,
    private loginHistoryService: LoginHistoryService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
    @InjectRepository(Confirm) private confirmRepository: Repository<Confirm>,
  ) {}

  async signIn(signinParams: SigninParams): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [
        {
          email: signinParams.username,
        },
        { username: signinParams.username },
        { phone: signinParams.username },
      ],
    });

    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    const isMatch = await bcrypt.compare(signinParams.password, user.password);

    if (!isMatch)
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);

    const devicesEntity = await this.deviceRepository.find({
      where: { user: user },
      select: ['name'],
    });

    const devices = devicesEntity.map((item) => item.name);

    if (devices.length === 0) {
      const firstDevice = await this.deviceRepository.create({
        user: user,
        name: signinParams.device,
      });
      await this.deviceRepository.save(firstDevice);
    } else if (devices.length > 0) {
      const isOldDevice = devices.includes(signinParams.device);

      if (!isOldDevice) {
        await this.mailService.mailer({
          email: user.email,
          type: 'newDevice',
          params: { device: signinParams.device },
        });
        throw new HttpException(
          'You are logging in a new device, please check your email to confirm that.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const token = await this.appJwtService.signToken(
      { id: user.id },
      {
        expiresIn: '1d',
      },
    );

    await this.loginHistoryService.createLoginHistory({
      device: signinParams.device,
      ipAddress: signinParams.ipAddress,
      token: token,
      user: user,
    });

    user.token = token;
    this.userRepository.save(user);

    return user;
  }

  async signUp(signupParams: SignupParams) {
    const user = await this.userRepository.findOne({
      where: [
        { email: signupParams.email },
        { username: signupParams.username },
        { phone: signupParams.phone },
      ],
    });

    if (user)
      throw new HttpException(
        'email, username or phone number already used',
        HttpStatus.BAD_REQUEST,
      );

    const confirm = await this.confirmRepository.findOne({
      where: {
        email: signupParams.email,
        type: 'signUp',
        isConfirm: true,
      },
    });

    if (!confirm) throw new HttpException('Not verify', HttpStatus.BAD_REQUEST);

    const saltOrRounds = 10;
    const password = signupParams.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.userRepository.create({
      ...signupParams,
      password: hash,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
