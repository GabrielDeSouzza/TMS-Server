import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import {
  Allow,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { type IVehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

@InputType()
export class VehicleTypeInput
  implements Omit<IVehicleType, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  bodyWork: boolean;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
  @Field(() => [String], { nullable: true })
  @IsString()
  @IsNotEmpty()
  body_work_id: string[];
}

@InputType()
export class VehicleTypeUpdateInput extends PartialType(VehicleTypeInput) {
  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  del_body_id?: string[];
  @Field()
  @IsString()
  @IsNotEmpty()
  updated_by: string;
}
