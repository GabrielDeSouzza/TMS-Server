import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type INaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

@InputType()
export class NaturalPersonInput implements INaturalPerson {
  @Field()
  name: string;
  @Field(() => Date)
  date_birth: Date;
  @Field()
  gender: string;
  @Field()
  cpf: string;
  @Field()
  rg: string;
  @Field()
  cep: string;
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
  @Field()
  nationality: string;
}

@InputType()
export class NaturalPersonUpdate extends PartialType(NaturalPersonInput) {}
