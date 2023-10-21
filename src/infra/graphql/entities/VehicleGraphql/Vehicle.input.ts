import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

@InputType()
export class VehicleInput implements Omit<IVehicle, 'id'> {
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
  model_id: string;
}
@InputType()
export class VehicleUpdateInput extends PartialType(VehicleInput) {}
