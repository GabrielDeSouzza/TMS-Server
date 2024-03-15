import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IOrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { RouteLegalClientModel } from '../RouteLegalClientGraphql/RouteLegalClient.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export abstract class OrderProcessingLegalClientModel
  implements IOrderProcessingLegalClient
{
  @Field()
  id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Float)
  total_distance: number;
  @Field(() => Float)
  total_spend_liters: number;
  @Field(() => Float)
  total_spending_money: number;
  @Field(() => Date)
  start_at: Date;
  @Field(() => Date)
  end_at?: Date;
  @Field()
  order_id: string;
  @Field()
  vehicle_id: string;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
  @Field(() => LegalClientOrderModel)
  Order: LegalClientOrderModel;
  @Field(() => [RouteLegalClientModel])
  Routes = [RouteLegalClientModel];
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
