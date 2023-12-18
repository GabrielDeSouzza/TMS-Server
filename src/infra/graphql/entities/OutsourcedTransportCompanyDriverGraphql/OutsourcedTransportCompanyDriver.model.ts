import { Field, ObjectType } from '@nestjs/graphql';

import { CNH } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type IOutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class OutsourcedTransportCompanyDriverModel
  implements IOutsourcedTransportCompanyDriver
{
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field()
  id?: string;
  @Field()
  natural_person_id: string;
  @Field()
  cnh: string;
  @Field()
  cnh_category: CNH;
  @Field()
  cnh_expiration: Date;
  @Field()
  course_mopp: boolean;
  @Field()
  outsourced_transport_company_id: string;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field(() => NaturalPersonModel)
  NaturalPerson: NaturalPersonModel;
  @Field(() => OutsourcedTransportCompanyModel)
  OutsourcedTransportCompany: OutsourcedTransportCompanyModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
