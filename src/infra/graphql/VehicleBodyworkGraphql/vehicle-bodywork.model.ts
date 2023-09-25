import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

@ObjectType()
export class VehicleBodyworkModel implements IVehicleBodywork {
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
}
