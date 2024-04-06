import { type IMaintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

export abstract class CreateMaintenanceDTO implements IMaintenance {
  maintenance_company_id: string;
  vehicle_id: string;
  type_of_maintenance_id: string;
  updated_by: string;
  created_by: string;
}
