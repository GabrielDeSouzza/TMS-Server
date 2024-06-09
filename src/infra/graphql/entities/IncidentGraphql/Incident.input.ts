import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IIncident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

@InputType()
export class IncidentInput
  implements Omit<IIncident, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date_incident: Date;
  @Field()
  @IsUUID()
  @IsNotEmpty({ message: 'O PROCESSAMENTO DE ID NÃO PODE SER VAZIO' })
  order_process_id: string;
  @Field(() => Date, { nullable: true })
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_resolved?: Date;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}

@InputType()
export class IncidentUpdateInput extends PartialType(IncidentInput) {}
@InputType()
export class IncidentUpdateManyInput extends PartialType(IncidentInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
