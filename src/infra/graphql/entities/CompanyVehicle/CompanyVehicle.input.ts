import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { type ICompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';

import {
  VehicleUpdateInput,
  VehicleInput,
} from '../VehicleGraphql/Vehicle.input';

@InputType()
export class CompanyVehicleInput
  implements
    Omit<ICompanyVehicle, 'id' | 'created_at' | 'updated_at' | 'vehicle_id'>
{
  @Field()
  @IsUUID()
  @IsNotEmpty()
  carrier_company_id: string;
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  vehicle_id?: string;
  @Field(() => VehicleInput, { nullable: true })
  @IsOptional()
  @IsObject()
  Vehicle?: VehicleInput;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class CompanyVehicleUpdateInput extends PartialType(
  OmitType(CompanyVehicleInput, ['Vehicle']),
) {
  @IsObject()
  @Field(() => VehicleUpdateInput)
  Vehicle: VehicleUpdateInput;
  @HideField()
  @Allow()
  updated_by: string;
}
