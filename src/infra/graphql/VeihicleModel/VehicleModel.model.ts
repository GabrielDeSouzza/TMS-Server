import { Field, ObjectType } from '@nestjs/graphql';

import { type VehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { type IVehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

import { VehicleTypeModel } from '../VehicleType./VehicleType.model';

@ObjectType()
export class VehicleModelGraphql implements IVehicleModel {
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field()
  name: string;
  @Field()
  weight: number;
  @Field()
  capacity_max: number;
  @Field()
  axles: number;
  @Field()
  capacity_per_axle?: number;
  @Field()
  brand_id?: string;
  @Field()
  type_id?: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  VehicleBrand: VehicleBrand;
  @Field(() => VehicleTypeModel)
  VehicleType: VehicleType;
}
