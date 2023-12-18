import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { CNH } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type IOutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class OutsourcedTransportCompanyDriverInput
  implements
    Omit<IOutsourcedTransportCompanyDriver, 'id' | 'created_at' | 'updated_at'>
{
  @Field({ nullable: true })
  natural_person_id: string;
  @Field()
  cnh: string;
  @Field(() => CNH)
  cnh_category: CNH;
  @Field()
  cnh_expiration: Date;
  @Field()
  course_mopp: boolean;
  @Field()
  outsourced_transport_company_id: string;
  @HideField()
  updated_by: string;
  @Field(() => NaturalPersonInput, { nullable: true })
  NaturalPerson?: NaturalPersonInput;
  @HideField()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyDriverUpdateInput extends PartialType(
  OmitType(OutsourcedTransportCompanyDriverInput, ['NaturalPerson']),
) {
  @Field(() => NaturalPersonUpdate)
  NaturalPerson: NaturalPersonUpdate;
}
