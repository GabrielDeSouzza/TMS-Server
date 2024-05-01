import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';
import {
  type CountMaintenanceRequestDTO,
  type FindAllMaintenanceWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/MaintenanceRepositoryDto';
import { Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';
import { MaintenanceRepository } from 'domain/repositories/MaintenanceRepository';

import { type CreateMaintenanceDTO } from 'app/dtos/MaintenanceDto/CreateMaintenanceDto';
import { type UpdateMaintenanceDTO } from 'app/dtos/MaintenanceDto/UpdateMaintenanceDto';
import { type UpdateManyMaintenanceDTO } from 'app/dtos/MaintenanceDto/UpdateManyMaintenanceDto';

@Injectable()
export class MaintenanceUseCases {
  constructor(private maintenanceRepository: MaintenanceRepository) {}
  async countMaintenance(request: CountMaintenanceRequestDTO) {
    return this.maintenanceRepository.countMaintenance(request);
  }
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
      finished_at: data.finished_at,
      vehicle_id: null,
    });

    return this.maintenanceRepository.updateMaintenance(id, updateMaintenance);
  }
  async updateManyMaintenance(
    data: UpdateManyMaintenanceDTO[],
    updateBy: string,
  ) {
    for (const maintenance of data)
      await this.verifyMaintenanceExist(maintenance.id);
    const maintenances = data.map(maintenance => {
      const maintenanceUpdated = new Maintenance({
        created_by: null,
        maintenance_company_id: maintenance.maintenance_company_id,
        type_of_maintenance_id: maintenance.type_of_maintenance_id,
        finished_at: maintenance.finished_at,
        id: maintenance.id,
        updated_by: updateBy,
        vehicle_id: null,
      });

      return maintenanceUpdated;
    });

    return this.maintenanceRepository.updateManyMaintenance(maintenances);
  }
  async deleteMaintenance(id: string) {
    await this.getMaintenance({ id });

    return this.maintenanceRepository.deleteMaintenance(id);
  }
  async deleteManyMaintenance(ids: string[]) {
    for (const maintenanceId of ids)
      await this.verifyMaintenanceExist(maintenanceId);

    return this.maintenanceRepository.deleteManyMaintenance(ids);
  }
  private async verifyMaintenanceExist(id: string) {
    const exist = await this.maintenanceRepository.findMaintenance({
      id,
    });
    if (!exist)
      throw new GraphQLError(`THIS MAINTENANCE ID ${id} NOT FOUND`, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
