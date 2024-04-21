import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

import { CompanyVehicleIModel } from '../CompanyVehicle/CompanyVehicle.model';
import { ContractOutsourcedDriverModel } from '../ContractOutsourcedDriverGraphql/ContractOutsourcedDriver.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import {
  OutsourcedVehicleIModel,
  OutsourcedVehicleRecefencesModel,
} from '../OutsourcedVehicle/OutsourcedVehicle.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class OutsourcedDriverModel
  implements Omit<IOutsourcedDriver, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  id: string;
  @Field()
  natural_person_id: string;
  @Field(() => NaturalPersonModel)
  NaturalPerson: NaturalPersonModel;
  @Field()
  cnh: string;
  @Field()
  cnh_category: string;
  @Field()
  cnh_expiration: Date;
  @Field()
  company_vehicle: boolean;
  @Field()
  course_mopp: boolean;
  @Field()
  outsourced_vehicle_id: string;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field(() => [ContractOutsourcedDriverModel])
  ContractOutsourcedDriver: ContractOutsourcedDriverModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  @Field(() => OutsourcedVehicleIModel, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleRecefencesModel;
  @Field(() => CompanyVehicleIModel, { nullable: true })
  CompanyVehicle?: CompanyVehicleIModel;
}
