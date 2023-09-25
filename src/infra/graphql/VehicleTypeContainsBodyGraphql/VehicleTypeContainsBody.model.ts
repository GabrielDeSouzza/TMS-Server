import { Field, ObjectType } from '@nestjs/graphql';

import { type VehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';
import { type IVehicleTypeContainsBody } from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';
import { type VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

import { VehicleBodyworkModel } from '../VehicleBodyworkGraphql/vehicle-bodywork.model';
import { VehicleTypeModel } from '../VehicleType/VehicleType.model';

@ObjectType()
export class VehicleTypeContainsBodyGraphql
  implements IVehicleTypeContainsBody
{
  @Field(() => VehicleBodyworkModel)
  VehicleBodywork: VehicleBodywork;
  @Field(() => VehicleTypeModel)
  VehicleType: VehicleType;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
}
