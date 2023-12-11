import { Field, HideField, ObjectType, OmitType } from '@nestjs/graphql';

import { type IOutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export class OutsourcedVehicleIModel implements IOutsourcedVehicle {
  @Field()
  id: string;
  @Field()
  vehicle_id: string;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}

@ObjectType()
export class OutsourcedVehicleRecefencesModel extends OmitType(
  OutsourcedVehicleIModel,
  [
    'CreatedUser',
    'UpdatedUser',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
  ],
) {}
