import {
  type TypeMaintenanceProps,
  type ITypeOfMaintenance,
} from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

export abstract class CreateTypeOfMaintenanceDTO implements ITypeOfMaintenance {
  description: string;
  typeMaintenance: TypeMaintenanceProps;
  created_by: string;
  updated_by: string;
}
