import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type ILegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

@InputType()
export class LegalClientCteInput implements ILegalClientCte {
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
export class LegalClientCteUpdateInput extends PartialType(
  LegalClientCteInput,
) {}
