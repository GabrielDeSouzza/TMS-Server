import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsNotEmpty, IsObject, IsString } from 'class-validator';

import { type IOutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';

import {
  VehicleInput,
  VehicleUpdateInput,
} from '../VehicleGraphql/Vehicle.input';

@InputType()
export class OutsourcedTransportVehicleInput
  implements
    Omit<
      IOutsourcedTransportVehicle,
      'id' | 'created_at' | 'updated_at' | 'vehicle_id'
    >
{
  @Field()
  @IsString()
  @IsNotEmpty()
  outsourced_company_id: string;
  @Field(() => VehicleInput)
  @IsObject()
  @Type(() => VehicleInput)
  Vehicle: VehicleInput;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class OutsourcedTransportVehicleUpdateInput extends PartialType(
  OmitType(OutsourcedTransportVehicleInput, ['Vehicle']),
) {
  @Field(() => VehicleUpdateInput, { nullable: true })
  Vehicle?: VehicleUpdateInput;
  updated_by: string;
}
