import {
  type TypeMaintenanceProps,
  type ITypeOfMaintenance,
} from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

export abstract class UpdateTypeOfMaintenanceDTO
  implements Partial<ITypeOfMaintenance>
{
  updated_by?: string;
  description?: string;
  typeMaintenance?: TypeMaintenanceProps;
}
