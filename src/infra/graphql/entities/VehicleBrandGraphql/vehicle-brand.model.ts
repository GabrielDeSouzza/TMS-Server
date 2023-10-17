import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleModelGraphql } from '../VeihicleModelGraphql/vehicle-model.model';

@ObjectType()
export class VehicleBrandModel implements IVehicleBrand {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field(() => UserModelRefereces)
  updatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  createdUser: UserModelRefereces;
  @Field(() => VehicleModelGraphql, { nullable: true })
  VehicleModels?: VehicleModelGraphql[];
}

@ObjectType()
export class VehicleBrandReferences extends OmitType(VehicleBrandModel, [
  'VehicleModels',
  'createdUser',
  'updatedUser',
  'created_at',
  'created_by',
  'updated_at',
  'updated_by',
]) {}
