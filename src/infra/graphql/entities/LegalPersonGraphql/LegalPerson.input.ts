import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type ILegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

@InputType()
export class LegalPersonInput
  implements Omit<ILegalPerson, 'id' | 'created_at' | 'updated_at'>
{
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
}
@InputType()
export class LegalPersonUpdateInput extends PartialType(LegalPersonInput) {}
