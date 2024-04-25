import { type GetIcmsDTO } from 'domain/dto/repositories/getDataDtos/GetIcmsDto';
import {
  type CountIcmsRequestDTO,
  type FindAllIcmsWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/IcmsRepositoryDto';
import { type Icms } from 'domain/entities/ICMSEntity/Icms';

export abstract class IcmsRepository {
  abstract countIcms(request: CountIcmsRequestDTO): Promise<number>;
  abstract findIcms(request: GetIcmsDTO): Promise<Icms>;
  abstract findAllIcms(parameters: FindAllIcmsWhereRequestDTO): Promise<Icms[]>;
  abstract createIcms(contract: Icms): Promise<Icms>;
  abstract updateIcms(id: string, icms: Icms): Promise<Icms>;
  abstract updateManyIcms(data: Icms[]): Promise<Icms[]>;
  abstract deleteIcms(id: string): Promise<Icms>;
  abstract deleteManyIcms(ids: string[]): Promise<Icms[]>;
}
