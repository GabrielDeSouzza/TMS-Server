import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type IOutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';

import {
  VehicleInput,
  VehicleUpdateInput,
} from '../VehicleGraphql/Vehicle.input';

@InputType()
export class OutsourcedTransportVehicleInput
  implements
    Omit<
      IOutsourcedTransportVehicle,
      'id' | 'created_at' | 'updated_at' | 'vehicle_id'
    >
{
  @Field()
  outsourced_company_id: string;
  @Field(() => VehicleInput)
  Vehicle: VehicleInput;
  @HideField()
  created_by: string;
  @HideField()
  updated_by: string;
}
@InputType()
export class OutsourcedTransportVehicleUpdateInput extends PartialType(
  OmitType(OutsourcedTransportVehicleInput, ['Vehicle']),
) {
  @Field(() => VehicleUpdateInput, { nullable: true })
  Vehicle?: VehicleUpdateInput;
}
