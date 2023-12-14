import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';

import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export class OutsourcedTransportVehicleModel
  implements IOutsourcedTransportVehicle
{
  @Field()
  id: string;
  @Field()
  vehicle_id: string;
  @Field()
  outsourced_company_id: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
  @Field(() => OutsourcedTransportCompanyModel)
  OutsourcedTransportCompany: OutsourcedTransportCompanyModel;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
