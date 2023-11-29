import {
  Field,
  Float,
  HideField,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';

import { type IVehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';

@InputType()
export class VehicleModelInput
  implements Omit<IVehicleModel, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  name: string;
  @Field(() => Float)
  weight: number;
  @Field(() => Float)
  capacity_max: number;
  @Field()
  axles: number;
  @Field(() => Int)
  capacity_per_axle?: number;
  @Field()
  brand_id: string;
  @Field()
  type_id: string;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}

@InputType()
export class VehicleModelUpdateInput extends PartialType(VehicleModelInput) {}
