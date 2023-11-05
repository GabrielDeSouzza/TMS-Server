import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { CNH } from 'domain/entities/driverEntities/ownDriver/OwnDriver';

import { ContractOutsourcedDriverRefencesModel } from '../ContractOutsourcedDriverGraphql/ContractOutsourcedDriver.model';
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
  cnh_category: CNH;
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
  @Field(() => [ContractOutsourcedDriverRefencesModel])
  ContractOutsourcedDriver: ContractOutsourcedDriverRefencesModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  @Field(() => OutsourcedVehicleIModel, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleRecefencesModel;
}
