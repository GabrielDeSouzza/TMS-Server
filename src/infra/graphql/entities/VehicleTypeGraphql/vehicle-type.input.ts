import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
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
  @IsArray()
  @IsNotEmpty()
  body_work_id: string[];
}

@InputType()
export class VehicleTypeUpdateInput extends PartialType(
  OmitType(VehicleTypeInput, ['created_by']),
) {
  @Field(() => [String], { nullable: true })
  del_body_id?: string[];
  @HideField()
  updated_by: string;
}
