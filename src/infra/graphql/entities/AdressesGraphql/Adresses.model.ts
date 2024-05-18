import { Field, ObjectType } from '@nestjs/graphql';

import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';

@ObjectType()
export class AdressModel implements AdressesType {
  @Field()
  id?: string;
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
