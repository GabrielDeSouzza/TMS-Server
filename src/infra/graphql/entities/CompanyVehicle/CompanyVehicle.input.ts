import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type ICompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';

import {
  VehicleUpdateInput,
  VehicleInput,
} from '../VehicleGraphql/Vehicle.input';

@InputType()
export class CompanyVehicleInput
  implements Omit<ICompanyVehicle, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  carrier_company_id: string;
  @HideField()
  vehicle_id: string;
  @Field(() => VehicleInput)
  Vehicle: VehicleInput;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class CompanyVehicleUpdateInput extends PartialType(
  OmitType(CompanyVehicleInput, ['Vehicle']),
) {
  @Field(() => VehicleUpdateInput)
  Vehicle: VehicleUpdateInput;
}
