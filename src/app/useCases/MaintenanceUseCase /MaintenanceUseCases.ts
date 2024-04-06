import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';
import { type FindAllMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceRepositoryDto';
import { Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';
import { MaintenanceRepository } from 'domain/repositories/MaintenanceRepository';

import { type CreateMaintenanceDTO } from 'app/dtos/MaintenanceDto/CreateMaintenanceDto';
import { type UpdateMaintenanceDTO } from 'app/dtos/MaintenanceDto/UpdateMaintenanceDto';

@Injectable()
export class MaintenanceUseCases {
  constructor(private maintenanceRepository: MaintenanceRepository) {}
  async getMaintenance(request: GetMaintenanceDTO) {
    const maintenance = await this.maintenanceRepository.findMaintenance(
      request,
    );
    if (!maintenance)
      throw new GraphQLError('MAINTENANCE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return maintenance;
  }

  async getAllMaintenance(request: FindAllMaintenanceWhereRequestDTO) {
    const maintenances = await this.maintenanceRepository.findAllMaintenance(
      request,
    );
    if (maintenances.length === 0)
      throw new GraphQLError('ANY MAINTENANCE FOUND ', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return maintenances;
  }
  async createMaintenance(data: CreateMaintenanceDTO) {
    const newMaintenance = new Maintenance({
      created_by: data.created_by,
      maintenance_company_id: data.maintenance_company_id,
      type_of_maintenance_id: data.type_of_maintenance_id,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
    });

    return this.maintenanceRepository.createMaintenance(newMaintenance);
  }

  async updateMaintenance(id: string, data: UpdateMaintenanceDTO) {
    await this.getMaintenance({ id });
    const updateMaintenance = new Maintenance({
      created_by: null,
      maintenance_company_id: data.maintenance_company_id,
      type_of_maintenance_id: data.type_of_maintenance_id,
      updated_by: data.updated_by,
      vehicle_id: null,
    });

    return this.maintenanceRepository.updateMaintenance(id, updateMaintenance);
  }
}
