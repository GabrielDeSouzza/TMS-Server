import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

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
  vehicle_id: string;
  @Field(() => VehicleInput)
  Vehicle: VehicleInput;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class OutsourcedVehicleUpdateInput extends PartialType(
  OmitType(OutsourcedVehicleInput, ['Vehicle']),
) {
  @Field(() => VehicleUpdateInput, { nullable: true })
  Vehicle: VehicleUpdateInput;
}
