import { Field, HideField, InputType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Allow, IsOptional, IsUUID } from 'class-validator';

import { type IManifest } from 'domain/entities/ManifestEntity/Manifest';

@InputType()
export class ManifestInput
  implements Omit<IManifest, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  number: string;
  @IsUUID()
  @Field()
  order_processing_id: string;

  @HideField()
  @Allow()
  @IsOptional()
  manifest_url?: string;
  @Type(() => Date)
  @HideField()
  @Allow()
  emission_date: Date;
  @HideField()
  @Allow()
  serie: string;
  @HideField()
  @Allow()
  num_protocol: string;
  @HideField()
  @Allow()
  acess_key: string;
}
