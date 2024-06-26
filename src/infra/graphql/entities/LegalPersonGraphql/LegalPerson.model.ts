import { Field, ObjectType } from '@nestjs/graphql';

import { type ILegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

@ObjectType()
export class LegalPersonModel implements ILegalPerson {
  @Field()
  id?: string;
  @Field()
  fantasy_name: string;
  @Field()
  cnpj: string;
  @Field()
  state_registration: string;
  @Field()
  corporate_name: string;
  @Field()
  public_place: string;
  @Field()
  address_number: string;
  @Field()
  cep: string;
  @Field()
  neighborhood: string;
  @Field({ nullable: true })
  complement?: string;
  @Field()
  city: string;
  @Field()
  uf: string;
  @Field()
  first_phone: string;
  @Field({ nullable: true })
  second_phone?: string;
  @Field({ nullable: true })
  third_phone?: string;
  @Field()
  email: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
}
