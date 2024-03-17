import {
  Field,
  Float,
  HideField,
  InputType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { type IIcms } from 'domain/entities/ICMSEntity/Icms';

@InputType()
export class IcmsInput
  implements Omit<IIcms, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  state_origin: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  recipient_state: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  aliquot: number;
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  effective_date: Date;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class IcmsUpdateInput extends PartialType(IcmsInput) {}
