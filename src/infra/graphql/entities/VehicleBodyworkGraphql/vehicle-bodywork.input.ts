import {
  Field,
  Float,
  HideField,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

@InputType()
export class VehicleBodyworkInput
  implements Omit<IVehicleBodywork, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  name: string;
  @Field(() => Int)
  axles: number;
  @Field(() => Float)
  mass: number;
  @Field(() => Float)
  volume: number;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class VehicleBodyworkUpdateInput extends PartialType(
  VehicleBodyworkInput,
) {}
