import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { type IOwnDriver } from 'domain/entities/driverEntities/ownDriver/OwnDriver';
import { CNH } from 'domain/entities/driverEntities/ownDriver/OwnDriver';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';

@ObjectType()
export class OwnDriverModel implements IOwnDriver {
  @Field()
  id?: string;
  @Field()
  natural_person_id: string;
  @Field()
  cnh: string;
  @Field()
  cnh_category: CNH;
  @Field(() => Date)
  cnh_expiration: Date;
  @Field()
  company_vehicle: boolean;
  @Field()
  course_mopp: boolean;
  @Field()
  created_at: Date;
  @Field()
  updated_at: Date;
  @Field()
  cpf?: string;
  @Field(() => NaturalPersonModel)
  NaturalPerson: NaturalPersonModel;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
}

registerEnumType(CNH, { name: 'ROLE' });
