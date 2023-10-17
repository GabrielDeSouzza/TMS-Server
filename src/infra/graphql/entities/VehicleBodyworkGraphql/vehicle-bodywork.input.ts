import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

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
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
}
@InputType()
export class VehicleBodyworkUpdateInput extends PartialType(
  VehicleBodyworkInput,
) {}
