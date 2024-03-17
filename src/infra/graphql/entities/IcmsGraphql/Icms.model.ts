import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IIcms } from 'domain/entities/ICMSEntity/Icms';

@ObjectType()
export class IcmsModel implements IIcms {
  @Field()
  id: string;
  @Field()
  state_origin: string;
  @Field()
  recipient_state: string;
  @Field(() => Float)
  aliquot: number;
  @Field(() => Date)
  effective_date: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
}
