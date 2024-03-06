import { Field, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

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
  model_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  antt: string;
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isIpvaPaid: boolean;
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  registration: Date;
}
@InputType()
export class VehicleUpdateInput extends PartialType(VehicleInput) {}
