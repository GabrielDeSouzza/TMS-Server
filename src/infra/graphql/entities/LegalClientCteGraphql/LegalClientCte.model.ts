import { Field, ObjectType } from '@nestjs/graphql';

import { type ILegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

@ObjectType()
export class LegalClientCteModel implements ILegalClientCte {
  @Field()
  cteType: string;
  @Field()
  id?: string;
  @Field()
  orderId: string;
  @Field()
  acessKey: string;
  @Field({ nullable: true })
  observations?: string;
  @Field()
  cteNumber: string;
}
