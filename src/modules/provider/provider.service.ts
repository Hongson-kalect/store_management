import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProviderParams } from './provider.type';
import { Provider } from 'src/typeOrm/entities/Provider';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepo: Repository<Provider>,
  ) {}

  getProviders = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.providerRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.providerRepo.find();
  };

  getProviderById = async (id: number) => {
    const building = await this.providerRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createProvider = async (createProviderParams: CreateProviderParams) => {
    const newLogin = this.providerRepo.create({
      name: createProviderParams.name,
      describe: createProviderParams.describe,
    });

    const saved = await this.providerRepo.save(newLogin);
    return saved.id;
  };
}
