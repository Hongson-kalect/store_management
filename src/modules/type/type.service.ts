import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTypeParams, EditTypeParams } from './type.type';
import { Type } from 'src/typeOrm/entities/Type';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepo: Repository<Type>,
  ) {}

  getTypes = async (getTypeParams?: { id?: number[] }) => {
    if (getTypeParams?.id?.length > 0) {
      return await this.typeRepo.find({
        where: {
          id: In(getTypeParams?.id),
        },
      });
    }

    return await this.typeRepo.find();
  };

  getTypeById = async (id: number) => {
    const type = await this.typeRepo.findOneBy({ id: id });

    if (!type) throw new HttpException('No type found', HttpStatus.NOT_FOUND);
    return type;
  };

  createType = async (createTypeParams: CreateTypeParams) => {
    const newType = this.typeRepo.create({
      name: createTypeParams.name,
      describe: createTypeParams.describe,
      category: createTypeParams.category,
    });

    const saved = await this.typeRepo.save(newType);
    return saved.id;
  };

  editType = async (editTypeParams: EditTypeParams) => {
    return await this.typeRepo.save({
      id: editTypeParams?.id,
      name: editTypeParams.name,
      describe: editTypeParams.describe,
      category: editTypeParams.category,
    });
  };

  deleteType = async (id: number) => {
    const type = await this.typeRepo.findOneBy({ id });
    if (!type) throw new HttpException('No Type Found', HttpStatus.NOT_FOUND);
    await this.typeRepo.softRemove(type);
  };
}
