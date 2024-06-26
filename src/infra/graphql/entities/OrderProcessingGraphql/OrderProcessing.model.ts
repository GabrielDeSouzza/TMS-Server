import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type IOrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';

import { statusOrderEmum } from '../../enums/OrderStatusEnum.enum';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { OwnDriverModel } from '../OwnDriverGraphql/OwnDriver.model';
import { PhysicalCustomerOrderModel } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';

@ObjectType()
export abstract class OrderProcessingModel implements IOrderProcessing {
  @Field()
  order_processing_number: string;

  @Field()
  id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Float)
  total_distance: number;
  @Field(() => statusOrderEmum)
  status: statusOrderEmum;
  @Field(() => Float)
  total_spend_liters: number;
  @Field(() => Float)
  total_spending_money: number;
  @Field(() => Date)
  start_at: Date;
  @Field(() => Date, { nullable: true })
  end_at?: Date;
  @Field()
  driver_id: string;
  @Field()
  vehicle_id: string;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => VehicleCarModel)
  Vehicle: VehicleCarModel;
  @Field(() => [LegalClientOrderModel])
  LegalClientOrders: LegalClientOrderModel[];
  @Field(() => [PhysicalCustomerOrderModel])
  PhysicalCustomerOrders: PhysicalCustomerOrderModel[];
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  @Field(() => OwnDriverModel)
  OwnDriver: OwnDriverModel;
}
