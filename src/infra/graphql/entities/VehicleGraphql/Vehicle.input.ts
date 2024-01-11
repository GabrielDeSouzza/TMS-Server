import { Field, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

import { type IVehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

@InputType()
export class VehicleInput implements Omit<IVehicle, 'id'> {
  @Field()
  @IsString()
  @IsNotEmpty()
  plate: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  year: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  color: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  renavam: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  rntrc_expiration: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  model_id: string;
}
@InputType()
export class VehicleUpdateInput extends PartialType(VehicleInput) {}
