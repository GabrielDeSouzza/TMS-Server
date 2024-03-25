import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type IPhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte';

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
  @Field()
  @IsString()
  @IsNotEmpty()
  cteType: string;
}

@InputType()
export class PhysicalCustomerCteUpdateInput extends PartialType(
  PhysicalCustomerCteInput,
) {}
