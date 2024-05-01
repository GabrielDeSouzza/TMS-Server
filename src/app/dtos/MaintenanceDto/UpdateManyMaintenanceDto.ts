import { type IMaintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

export abstract class UpdateManyMaintenanceDTO
  implements Partial<IMaintenance>
{
  updated_by: string;
  finished_at?: Date;
  maintenance_company_id?: string;
  type_of_maintenance_id?: string;
  id: string;
}
