import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

import { UserModel } from '../UserGraphql/user.model';

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
  @Field(() => UserModel)
  updatedUser: UserModel;
  @Field(() => UserModel, { nullable: true })
  createdUser: UserModel;
}
