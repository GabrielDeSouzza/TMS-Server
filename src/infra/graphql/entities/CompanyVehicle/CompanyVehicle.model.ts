import { Field, ObjectType } from '@nestjs/graphql';

import { type ICompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export class CompanyVehicleIModel implements ICompanyVehicle {
  @Field()
  id: string;
  @Field()
  vehicle_id: string;
  @Field(() => Date)
  created_at: Date;
  @Field()
  carrier_company_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
  @Field(() => CarrierCompanyModel)
  CarrierCompany: CarrierCompanyModel;
}
