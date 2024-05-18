import { Field, InputType } from '@nestjs/graphql';

import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';

@InputType()
export class AdressInput implements AdressesType {
  @Field()
  postalCod: string;
  @Field()
  street: string;
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
}
