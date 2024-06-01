import { Field, ObjectType } from '@nestjs/graphql';

import { type IManifest } from 'domain/entities/ManifestEntity/Manifest';

@ObjectType()
export class ManifestModel implements IManifest {
  @Field()
  number: string;

  @Field()
  order_processing_id: string;

  @Field({ nullable: true })
  manifest_url?: string;
  @Field(() => Date)
  emission_date: Date;

  @Field()
  serie: string;

  @Field()
  num_protocol: string;

  @Field()
  acess_key: string;
}
