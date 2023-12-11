import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type IVehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';
import { type IVehicleTypeContainsBody } from 'domain/entities/VehicleEntities/vehicleTypeContainsBody/VehicleContainsBody';
import { type IVehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

import { VehicleBodyworkModelReferences } from '../VehicleBodyworkGraphql/vehicle-bodywork.model';
import { VehicleTypeReferences } from '../VehicleTypeGraphql/vehicle-type.model';

@ObjectType()
export class VehicleTypeContainsBodyModel implements IVehicleTypeContainsBody {
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field()
  id?: string;
  @Field()
  vehicle_bodywork_id: string;
  @Field()
  vehicle_type_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field(() => [VehicleBodyworkModelReferences])
  VehicleBodywork: IVehicleBodywork[];
}

@ObjectType()
export class VehicleBodyworkContainsTypes extends OmitType(
  VehicleTypeContainsBodyModel,
  ['VehicleBodywork'],
) {
  @Field(() => [VehicleTypeReferences])
  VehicleType: IVehicleType[];
}
