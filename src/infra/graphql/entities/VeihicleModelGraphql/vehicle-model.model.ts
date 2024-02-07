import { Field, Float, Int, ObjectType, OmitType } from '@nestjs/graphql';

import { type IVehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';

import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';

@ObjectType()
export class VehicleModelGraphql implements IVehicleModel {
  @Field()
  id?: string;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field()
  name: string;
  @Field(() => Float)
  weight: number;
  @Field(() => Float)
  capacity_max: number;
  @Field(() => Int)
  axles: number;
  @Field(() => Int)
  capacity_per_axle?: number;
  @Field()
  brand_id: string;
  @Field()
  type_id: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => VehicleBrandReferences)
  VehicleBrand: VehicleBrandReferences;
  @Field(() => VehicleTypeModel)
  VehicleType: VehicleTypeModel;
}

@ObjectType()
export class VehicleModelReferences extends OmitType(VehicleModelGraphql, [
  'VehicleBrand',
  'VehicleType',
  'created_at',
  'created_by',
  'updated_at',
  'updated_by',
]) {}
