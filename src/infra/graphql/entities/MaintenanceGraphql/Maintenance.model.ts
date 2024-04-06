import { Field, ObjectType } from '@nestjs/graphql';

import { type IMaintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

import { MaintenanceCompanyModel } from '../MaintenanceCompanyGraphql/MaintenanceCompany.model';
import { TypeOfMaintenanceModel } from '../TypeOfMaintenanceGraphql/TypeOfMaintenance.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export class MaintenanceModel implements IMaintenance {
  @Field()
  id?: string;
  @Field()
  maintenance_company_id: string;
  @Field()
  vehicle_id: string;
  @Field()
  type_of_maintenance_id: string;
  @Field(() => Date, { nullable: true })
  finished_at?: Date;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field(() => Date)
  created_at?: Date;
  @Field(() => Date)
  @Field(() => Date)
  updated_at?: Date;
  @Field(() => MaintenanceCompanyModel)
  MaintenanceCompany: MaintenanceCompanyModel;
  @Field(() => TypeOfMaintenanceModel)
  TypeOfMaintenance: TypeOfMaintenanceModel;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
}
