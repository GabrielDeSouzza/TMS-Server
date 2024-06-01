import { type GetManifestDTO } from 'domain/dto/repositories/getDataDtos/GetManifestDto';
import {
  type CountManifestRequestDTO,
  type FindAllManifestWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ManifestRepositoryDto';
import { type Manifest } from 'domain/entities/ManifestEntity/Manifest';

export abstract class ManifestRepository {
  abstract countManifest(request: CountManifestRequestDTO): Promise<number>;
  abstract findManifest(request: GetManifestDTO): Promise<Manifest>;
  abstract createManifest(physicalCustomerCte: Manifest): Promise<Manifest>;
  abstract findAllManifests(
    parameters: FindAllManifestWhereRequestDTO,
  ): Promise<Manifest[]>;
}
