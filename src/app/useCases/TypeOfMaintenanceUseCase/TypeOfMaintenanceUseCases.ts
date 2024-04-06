import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetTypeOfMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetTypeOfMaintenanceDto';
import { type FindAllTypeOfMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/TypeOfMaintenanceRepositoryDto';
import { TypeOfMaintenance } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';
import { TypeOfMaintenanceRepository } from 'domain/repositories/TypeOfMaintenanceRepository';

import { type CreateTypeOfMaintenanceDTO } from 'app/dtos/TypeOfMaintenanceDto/CreateTypeOfMaintenanceDto';
import { type UpdateTypeOfMaintenanceDTO } from 'app/dtos/TypeOfMaintenanceDto/UpdateTypeOfMaintenanceDto';

@Injectable()
export class TypeOfMaintenanceUseCases {
  constructor(
    private typeofmaintenanceRepository: TypeOfMaintenanceRepository,
  ) {}
  async getTypeOfMaintenance(request: GetTypeOfMaintenanceDTO) {
    if (!request.id) {
      throw new GraphQLError(
        'IS NECESSARY AN ID, NATURAL PERSON OR LEGAL PERSON DATA',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    }

    const typeofmaintenance =
      await this.typeofmaintenanceRepository.findTypeOfMaintenance(request);
    if (!typeofmaintenance)
      throw new GraphQLError('TYPEOFMAINTENANCE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return typeofmaintenance;
  }

  async getAllTypeOfMaintenance(
    request: FindAllTypeOfMaintenanceWhereRequestDTO,
  ) {
    const types =
      await this.typeofmaintenanceRepository.findAllTypeOfMaintenance(request);
    if (types.length === 0)
      throw new GraphQLError('ANY TYPE MAINTENANCE FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return types;
  }
  async createTypeOfMaintenance(data: CreateTypeOfMaintenanceDTO) {
    const typesExist =
      await this.typeofmaintenanceRepository.findTypeOfMaintenance({
        typeData: {
          description: data.description,
          typeMaintenance: data.typeMaintenance,
        },
      });
    if (typesExist)
      throw new GraphQLError('TYPE OF MAINTENANCE ALREADY EXIST', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    const newTypeOfMaintenance = new TypeOfMaintenance({
      created_by: data.created_by,
      updated_by: data.updated_by,
      description: data.description,
      typeMaintenance: data.typeMaintenance,
    });

    return this.typeofmaintenanceRepository.createTypeOfMaintenance(
      newTypeOfMaintenance,
    );
  }

  async updateTypeOfMaintenance(id: string, data: UpdateTypeOfMaintenanceDTO) {
    await this.getTypeOfMaintenance({ id });

    if (data.description && data.typeMaintenance) {
      const typesExist =
        await this.typeofmaintenanceRepository.findTypeOfMaintenance({
          typeData: {
            description: data.description,
            typeMaintenance: data.typeMaintenance,
          },
        });
      if (typesExist)
        throw new GraphQLError('TYPE OF MAINTENANCE ALREADY EXIST', {
          extensions: { code: HttpStatus.CONFLICT },
        });
    }

    const upTypeOfMaintenance = new TypeOfMaintenance({
      created_by: null,
      updated_by: data.updated_by,
      description: data.description,
      typeMaintenance: data.typeMaintenance,
    });

    return this.typeofmaintenanceRepository.updateTypeOfMaintenance(
      id,
      upTypeOfMaintenance,
    );
  }
}
