import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

@ObjectType()
export class VehicleTypeModel implements IVehicleType {
  @Field()
  name: string;
  @Field()
  bodyWork: boolean;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
}
