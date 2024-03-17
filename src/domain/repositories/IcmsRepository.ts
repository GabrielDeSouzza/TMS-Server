import { type GetIcmsDTO } from 'domain/dto/repositories/getDataDtos/GetIcmsDto';
import { type FindAllIcmsWhereRequestDTO } from 'domain/dto/repositories/whereDtos/IcmsRepositoryDto';
import { type Icms } from 'domain/entities/ICMSEntity/Icms';

export abstract class IcmsRepository {
  abstract findIcms(request: GetIcmsDTO): Promise<Icms>;
  abstract findAllIcms(parameters: FindAllIcmsWhereRequestDTO): Promise<Icms[]>;
  abstract createIcms(contract: Icms): Promise<Icms>;
  abstract updateIcms(id: string, contract: Icms): Promise<Icms>;
}
