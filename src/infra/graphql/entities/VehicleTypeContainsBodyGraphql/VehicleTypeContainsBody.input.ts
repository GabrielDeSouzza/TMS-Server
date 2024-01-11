import { Field, InputType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsString } from 'class-validator';

import { type IVehicleTypeContainsBody } from 'domain/entities/VehicleEntities/vehicleTypeContainsBody/VehicleContainsBody';

@InputType()
export class VehicleContainsBodyInput
  implements Omit<IVehicleTypeContainsBody, 'id' | 'updated_at' | 'created_at'>
{
  @Field()
  @Allow()
  updated_by: string;
  @Field()
  @Allow()
  created_by: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  vehicle_bodywork_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  vehicle_type_id: string;
}
