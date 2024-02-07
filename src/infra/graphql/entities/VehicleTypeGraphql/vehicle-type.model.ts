import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

import { UserModelRefereces } from '../UserGraphql/user.model';
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
  CpdatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
}
