import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeContainsBodyModel } from '../VehicleTypeContainsBodyGraphql/VehicleTypeContainsBody.model';
import { VehicleModelGraphql } from '../VeihicleModelGraphql/vehicle-model.model';

@ObjectType()
export class VehicleTypeModel implements IVehicleType {
  @Field()
  id: string;
  @Field(() => VehicleModelGraphql, { nullable: true })
  VehicleModels?: VehicleModelGraphql[];

  @Field()
  name: string;
  @Field()
  bodyWork: boolean;
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
  @Field(() => [VehicleTypeContainsBodyModel], { nullable: true })
  VehicleTypeContainsBody: VehicleTypeContainsBodyModel[];
}

@ObjectType()
export class VehicleTypeReferences extends OmitType(VehicleTypeModel, [
  'VehicleModels',
  'updatedUser',
  'createdUser',
  'updated_by',
  'created_at',
  'created_by',
  'updated_at',
] as const) {}
