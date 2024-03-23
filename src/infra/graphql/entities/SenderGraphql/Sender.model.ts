import { Field, ObjectType } from '@nestjs/graphql';

import { type ISender } from 'domain/entities/Sender/Sender';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';

@ObjectType()
export class SenderModel implements ISender {
  @Field()
  id: string;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field({ nullable: true })
  natural_person_id: string;
  @Field({ nullable: true })
  legal_person_id: string;
  @Field(() => NaturalPersonModel, { nullable: true })
  NaturalPerson: NaturalPersonModel;
  @Field(() => LegalPersonModel, { nullable: true })
  LegalPerson: LegalPersonModel;
}
