import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type IVehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

@InputType()
export class VehicleTypeInput
  implements Omit<IVehicleType, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  name: string;
  @Field()
  bodyWork: boolean;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => [String], { nullable: true })
  body_work_id: string[];
}

@InputType()
export class VehicleTypeUdateInput extends PartialType(VehicleTypeInput) {
  @Field(() => [String], { nullable: true })
  del_body_id?: string[];
  @Field()
  updated_by: string;
}
