import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeReferences } from '../VehicleTypeGraphql/vehicle-type.model';
import { VehicleModelReferences } from '../VeihicleModelGraphql/vehicle-model.model';

@ObjectType()
export class VehicleCarModel implements IVehicle {
  @Field()
  id: string;
  @Field()
  created_at: Date;
  @Field()
  updated_at: Date;
  @Field()
  plate: string;
  @Field()
  year: string;
  @Field()
  color: string;
  @Field()
  renavam: string;
  @Field()
  rntrc_expiration: string;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field()
  model_id: string;
  @Field(() => UserModelRefereces)
  updatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  createdUser: UserModelRefereces;
  @Field(() => VehicleModelReferences)
  VehicleModel: VehicleModelReferences;
  @Field(() => VehicleBrandReferences)
  VehicleBrand: VehicleBrandReferences;
  @Field(() => VehicleTypeReferences)
  VehicleType: VehicleTypeReferences;
}
