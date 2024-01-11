import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { type IContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

@InputType()
export class ContractOutsourcedDriverInput
  implements Omit<IContractOutsourcedDriver, 'updated_at' | 'created_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  situation: string;
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start_at: Date;
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_at?: Date;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  cpf: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  outsourced_driver_id: string;
}

@InputType()
export class ContractOutsourcedDriverReferecesInput extends OmitType(
  ContractOutsourcedDriverInput,
  ['outsourced_driver_id'],
) {}

@InputType()
export class ContractOutsoucedDriverUpdateInput extends PartialType(
  ContractOutsourcedDriverInput,
) {}
