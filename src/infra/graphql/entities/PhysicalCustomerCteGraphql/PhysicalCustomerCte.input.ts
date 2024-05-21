import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type IPhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';

import { typeCteEnum } from 'infra/graphql/enums/TypesCte.enum';

@InputType()
export class PhysicalCustomerCteInput implements IPhysicalCustomerCte {
  @Field()
  @IsString()
  @IsNotEmpty()
  orderId: string;
  @HideField()
  @Allow()
  acessKey: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  observations?: string;
  @HideField()
  @Allow()
  cteNumber: string;
  @Field(() => typeCteEnum)
  @IsString()
  @IsNotEmpty()
  cteType: typeCteEnum;
}

@InputType()
export class PhysicalCustomerCteUpdateInput extends PartialType(
  PhysicalCustomerCteInput,
) {}
