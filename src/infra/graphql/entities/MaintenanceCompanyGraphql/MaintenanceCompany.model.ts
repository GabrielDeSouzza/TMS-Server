import { Field, ObjectType, PartialType } from '@nestjs/graphql';

import { type IMaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class MaintenanceCompanyModel implements IMaintenanceCompany {
  @Field()
  id?: string;
  @Field({ nullable: true })
  specialty_maintenance: string;
  @Field()
  legal_person_id: string;
  @Field(() => LegalPersonModel)
  LegalPerson: LegalPersonModel;

  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
@ObjectType()
export class MaintenanceCompanyModelRefereces extends PartialType(
  MaintenanceCompanyModel,
) {}
