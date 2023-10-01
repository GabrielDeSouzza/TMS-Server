import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

import { VehicleBodyworkModel } from '../VehicleBodyworkGraphql/vehicle-bodywork.model';
import { VehicleModelGraphql } from '../VeihicleModel/VehicleModel.model';

@ObjectType()
export class VehicleTypeModel implements IVehicleType {
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => VehicleModelGraphql)
  VehicleModels?: VehicleModelGraphql[];
  @Field(() => VehicleBodyworkModel)
  VehicleTypeContainsBody?: VehicleBodyworkModel[];
  @Field()
  name: string;
  @Field()
  bodyWork: boolean;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
}
