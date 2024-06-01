import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetManifestDTO } from 'domain/dto/repositories/getDataDtos/GetManifestDto';
import {
  type CountManifestRequestDTO,
  type FindAllManifestWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ManifestRepositoryDto';
import { Manifest } from 'domain/entities/ManifestEntity/Manifest';
import { ManifestRepository } from 'domain/repositories/ManifestRepository';

import { type CreateManifestDTO } from 'app/dtos/ManifestDto/CreateManifestDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class ManifestUseCases {
  constructor(private manifestRepository: ManifestRepository) {}
  async countManifest(request: CountManifestRequestDTO) {
    return this.manifestRepository.countManifest(request);
  }
  async getManifest(request: GetManifestDTO) {
    const manifest = await this.manifestRepository.findManifest(request);
    if (!manifest)
      throw new GraphQLError('MANIFEST NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return manifest;
  }

  async getAllManifest(request: FindAllManifestWhereRequestDTO) {
    const manifests = await this.manifestRepository.findAllManifests(request);
    if (manifests.length === 0)
      throw new GraphQLError('ANY MANIFEST FOUND ', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return manifests;
  }
  async createManifest(data: CreateManifestDTO) {
    const newManifest = new Manifest({
      acess_key: generateRandomNumber(40),
      emission_date: new Date(),
      num_protocol: generateRandomNumber(10),
      number: generateRandomNumber(8),
      serie: generateRandomNumber(2),
      order_processing_id: data.order_processing_id,
    });

    return this.manifestRepository.createManifest(newManifest);
  }
}
