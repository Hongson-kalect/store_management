import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Confirm } from 'src/typeOrm/entities/Confirm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
// import { AppJwtService } from '../jwt/jwt.service';
import { User } from 'src/typeOrm/entities/User';
import { CreateConfirmParams, VerifyParams } from './confirm.type';
import { Device } from 'src/typeOrm/entities/Device';

@Injectable()
export class ConfirmService {
  constructor(
    @InjectRepository(Confirm) private confirmRepository: Repository<Confirm>,
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
    @InjectRepository(User) private userRepository: Repository<User>, // private appJwtService: AppJwtService,
  ) {}

  getConfirms = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.confirmRepository.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.confirmRepository.find();
  };

  getConfirmById = async (id: number) => {
    const building = await this.confirmRepository.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createConfirm = async (createConfirm: CreateConfirmParams) => {
    await this.deleteOldConfirm();
    await this.deleteOldUserConfirm(createConfirm.email, createConfirm.type);

    console.log(new Date());
    console.log(new Date().toString());
    console.log(new Date(new Date().getTime()));
    console.log(new Date(new Date().getTime() + 7 * 60 * 60 * 1000));

    const newConfirm = this.confirmRepository.create({
      email: createConfirm.email,
      type: createConfirm.type,
      value: createConfirm.value,
      information: createConfirm.information,
      // building??
    });
    this.confirmRepository.save(newConfirm);
  };

  verifyConfirm = async (verifyParams: VerifyParams) => {
    // const user = await this.userRepository.findOneBy({
    //   email: verifyParams.email,
    // });
    // if (!user) throw new HttpException('No User found', HttpStatus.BAD_REQUEST);

    const hourago = new Date(new Date().getTime() - 1000 * 60 * 60);

    console.log(hourago);

    // find connfirm that created within 1 hour

    const confirm = await this.confirmRepository.findOneBy({
      email: verifyParams.email,
      type: verifyParams.type,
      value: verifyParams.value,
      created_at: MoreThan(hourago),
    });

    console.log(verifyParams);
    console.log(confirm);

    if (!confirm) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    confirm.isConfirm = true;
    this.confirmRepository.save(confirm);

    return true;
  };

  confirmNewDevice = async (id: string) => {
    const fiveMinuteAgo = new Date(
      new Date(new Date().getTime() - 1000 * 5 * 60),
    );
    const confirm = await this.confirmRepository.findOneBy({
      value: id,
      created_at: MoreThan(fiveMinuteAgo),
    });
    if (!confirm)
      throw new HttpException(
        'Mã không đúng hoặc đã quá hạn (5 phút)',
        HttpStatus.NOT_FOUND,
      );

    const user = await this.userRepository.findOneBy({ email: confirm.email });

    const newDevice = this.deviceRepository.create({
      name: JSON.parse(confirm.information).device,
      user: user,
      isActive: true,
    });
    this.deviceRepository.save(newDevice);
    this.confirmRepository.remove(confirm);

    return 'confirm success';
  };

  deleteOldConfirm = async () => {
    const hourago = new Date(new Date().getTime() - 1000 * 60 * 60);
    const experiodRow = await this.confirmRepository.find({
      where: {
        created_at: LessThan(hourago),
      },
      select: ['id'],
    });

    const idList = experiodRow.map((item) => item.id);

    this.confirmRepository.delete({ id: In(idList) });
  };

  deleteOldUserConfirm = async (email: string, type: string) => {
    const experiodRow = await this.confirmRepository.find({
      where: {
        email: email,
        type: type,
      },
      select: ['id'],
    });

    if (experiodRow?.length > 0) {
      const idList = experiodRow.map((item) => item.id);
      this.confirmRepository.delete({ id: In(idList) });
    }
  };
}
