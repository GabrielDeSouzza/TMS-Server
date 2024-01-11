import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsObject } from 'class-validator';

import { type IOutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';

import {
  VehicleUpdateInput,
  VehicleInput,
} from '../VehicleGraphql/Vehicle.input';

@InputType()
export class OutsourcedVehicleInput
  implements Omit<IOutsourcedVehicle, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  vehicle_id: string;
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
export class OutsourcedVehicleUpdateInput extends PartialType(
  OmitType(OutsourcedVehicleInput, ['Vehicle']),
) {
  @Field(() => VehicleUpdateInput, { nullable: true })
  Vehicle: VehicleUpdateInput;
}
