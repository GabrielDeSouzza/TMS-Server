import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

@InputType()
export class VehicleTypeInput
  implements Omit<IVehicleType, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  name: string;
  @Field()
  bodyWork: boolean;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
}

@InputType()
export class VehicleBrandUpdateInput extends PartialType(VehicleTypeInput) {}
