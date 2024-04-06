import { type TypeMaintenanceProps } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

export abstract class GetTypeOfMaintenanceDTO {
  id?: string;
  typeData?: TypeMaintecanceData;
}

export abstract class TypeMaintecanceData {
  description: string;
  typeMaintenance: TypeMaintenanceProps;
}
