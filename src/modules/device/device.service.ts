import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDeviceParams } from './device.type';
import { Device } from 'src/typeOrm/entities/Device';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  getDevices = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.deviceRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.deviceRepo.find();
  };

  getDeviceById = async (id: number) => {
    const building = await this.deviceRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };
  createDevice = async (createDeviceParams: CreateDeviceParams) => {
    const newLogin = this.deviceRepo.create({
      name: createDeviceParams.name,
    });

    const saved = await this.deviceRepo.save(newLogin);
    return saved.id;
  };
}
