import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateFeeParams } from './fee.type';
import { Fee } from 'src/typeOrm/entities/Fee';
import { BuildingService } from '../building/building.service';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepo: Repository<Fee>,
    private buildingService: BuildingService,
  ) {}

  getFees = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams.id?.length > 0) {
      return await this.feeRepo.find({
        where: {
          id: In(getCartParams.id),
        },
      });
    }

    return await this.feeRepo.find();
  };

  getFeeById = async (id: number) => {
    const building = await this.feeRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createFee = async (createFeeParams: CreateFeeParams) => {
    // *** check user role before add fee

    const building = await this.buildingService.getBuildingById(
      createFeeParams.buildingId,
    );

    const newLogin = this.feeRepo.create({
      name: createFeeParams.name,
      value: createFeeParams.value,
      type: createFeeParams.type,
      building: building,
    });

    const saved = await this.feeRepo.save(newLogin);
    return saved.id;
  };
}
