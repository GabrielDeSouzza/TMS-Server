import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeContainsBodyGraphql } from '../VehicleTypeContainsBodyGraphql/VehicleTypeContainsBody.model';

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
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  @Field(() => [VehicleTypeContainsBodyGraphql], { nullable: true })
  VehicleTypeContainsBody?: [VehicleTypeContainsBodyGraphql];
}
