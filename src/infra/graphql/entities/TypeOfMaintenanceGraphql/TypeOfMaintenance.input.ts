import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  TypeMaintenanceProps,
  type ITypeOfMaintenance,
} from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

@InputType()
export class TypeOfMaintenanceInput
  implements Omit<ITypeOfMaintenance, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
  @Field(() => TypeMaintenanceProps)
  @IsString()
  @IsNotEmpty()
  typeMaintenance: TypeMaintenanceProps;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class TypeOfMaintenanceUpdateInput extends PartialType(
  TypeOfMaintenanceInput,
) {
  @HideField()
  @Allow()
  updated_by: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  typeMaintenance?: TypeMaintenanceProps;
}
