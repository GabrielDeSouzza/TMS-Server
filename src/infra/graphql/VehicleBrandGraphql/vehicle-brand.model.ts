import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { type VehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleModelGraphql } from '../VeihicleModel/VehicleModel.model';

@ObjectType()
export class VehicleBrandModel implements IVehicleBrand {
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
  @Field(() => UserModelRefereces, { nullable: true })
  createdUser: UserModelRefereces;
  @Field(() => VehicleModelGraphql, { nullable: true })
  VehicleModels?: VehicleModel[];
}
