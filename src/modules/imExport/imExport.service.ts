import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateImExportParams } from './imExport.type';
import { ImExport } from 'src/typeOrm/entities/ImExport';
// import { CreateHistoryParams } from './historyRequest.type';

@Injectable()
export class ImExportService {
  constructor(
    @InjectRepository(ImExport)
    private imExportRepo: Repository<ImExport>,
  ) {}

  getImExports = async (getCartParams?: { id?: number[] }) => {
    if (getCartParams?.id?.length > 0) {
      return await this.imExportRepo.find({
        where: {
          id: In(getCartParams?.id),
        },
      });
    }

    return await this.imExportRepo.find();
  };

  getImExportById = async (id: number) => {
    const building = await this.imExportRepo.findOneBy({ id: id });

    if (!building)
      throw new HttpException('No building found', HttpStatus.NOT_FOUND);
    return building;
  };

  createImExport = async (createImExportParams: CreateImExportParams) => {
    if (createImExportParams.type === 'Nhập') {
      // *** get and create new item if not exist, create new imexport, create new itemInfo with cost, quantity, item,  depend on request
      // *** return itemInfo id to this and use it for itemInfos field of this table.
      const newLogin = this.imExportRepo.create({
        name: createImExportParams.name,
        describe: createImExportParams.describe,
      });

      const saved = await this.imExportRepo.save(newLogin);
      return saved.id;
    }
    if (createImExportParams.type === 'Xuất') {
      // *** get item by itemId listenerCount, depend on quantity, subtract item quantity in itemInfo sort by productionTime...
    }
  };
  deleteImExport = async (id: number) => {
    const imExport = await this.imExportRepo.findOneBy({ id });
    if (!imExport)
      throw new HttpException('ImExport not found', HttpStatus.NOT_FOUND);
    return await this.imExportRepo.softRemove(imExport);
  };
}
