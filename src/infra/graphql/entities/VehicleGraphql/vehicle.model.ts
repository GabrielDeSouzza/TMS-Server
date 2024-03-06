import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
import { VehicleModelReferences } from '../VeihicleModelGraphql/vehicle-model.model';

@ObjectType()
export class VehicleCarModel implements IVehicle {
  @Field()
  isIpvaPaid: boolean;
  @Field(() => Date)
  registration: Date;
  @Field()
  id: string;
  @Field()
  plate: string;
  @Field()
  year: string;
  @Field()
  color: string;
  @Field()
  renavam: string;
  @Field()
  model_id: string;
  @Field()
  antt: string;
  @Field(() => UserModelRefereces)
  updatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  createdUser: UserModelRefereces;
  @Field(() => VehicleModelReferences)
  VehicleModel: VehicleModelReferences;
  @Field(() => VehicleBrandReferences)
  VehicleBrand: VehicleBrandReferences;
  @Field(() => VehicleTypeModel)
  VehicleType: VehicleTypeModel;
}
