import { Field, ObjectType } from '@nestjs/graphql';

import { type IRecipient } from 'domain/entities/Recipient/Recipient';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';

@ObjectType()
export class RecipientModel implements IRecipient {
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
