import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBuildingParams } from './building.type';
import { Building } from 'src/typeOrm/entities/Building';
import { TypeService } from '../type/type.service';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class BuildingService {
  constructor(
    private typeService: TypeService,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
  ) {}

  getBuilding = async (getTypeParams?: { id?: number[] }) => {
    if (getTypeParams?.id?.length > 0) {
      return await this.buildingRepo.find({
        where: {
          id: In(getTypeParams?.id),
        },
      });
    }

    return await this.buildingRepo.find();
  };

  getBuildingById = async (id: number) => {
    const building = await this.buildingRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createBuilding = async (createBuildingParams: CreateBuildingParams) => {
    const type = await this.typeService.getTypes({
      id: createBuildingParams.bussinessTypes,
    });

    const newBuilding = this.buildingRepo.create({
      address: createBuildingParams.address,
      bussinessTypes: type,
      email: createBuildingParams.email,
      name: createBuildingParams.name,
      openTime: JSON.stringify(createBuildingParams.openTime),
      title: createBuildingParams.title,
      describe: createBuildingParams.describe,
      phone: createBuildingParams.phone,
    });

    const saved = await this.buildingRepo.save(newBuilding);
    return saved.id;
  };

  requestSuccess = async (id: number) => {
    await this.buildingRepo.save({ id: id, isSucess: true });
  };
}
