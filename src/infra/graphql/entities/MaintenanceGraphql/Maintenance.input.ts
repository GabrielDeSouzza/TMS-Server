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
  IsUUID,
} from 'class-validator';

import { type IMaintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

@InputType()
export class MaintenanceInput
  implements Omit<IMaintenance, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  maintenance_company_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  vehicle_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  type_of_maintenance_id: string;

  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class MaintenanceUpdateInput extends PartialType(
  OmitType(MaintenanceInput, ['created_by', 'vehicle_id']),
) {
  @HideField()
  @Allow()
  updated_by: string;
  @Field()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  finished_at?: Date;
}
@InputType()
export class MaintenanceUpdateManyInput extends PartialType(MaintenanceInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @HideField()
  @Allow()
  updated_by: string;
}
