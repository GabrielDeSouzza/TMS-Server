import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
@ObjectType()
export class VehicleBodyworkModel implements IVehicleBodywork {
  @Field()
  id?: string;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field()
  name: string;
  @Field()
  axles: number;
  @Field()
  mass: number;
  @Field()
  volume: number;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => [VehicleTypeModel], { nullable: true })
  VehicleTypes: VehicleTypeModel[];
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}

@ObjectType()
export class VehicleBodyworkModelReferences extends OmitType(
  VehicleBodyworkModel,
  [
    'CreatedUser',
    'UpdatedUser',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
  ],
) {}
