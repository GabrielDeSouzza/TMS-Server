import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';

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
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
}
