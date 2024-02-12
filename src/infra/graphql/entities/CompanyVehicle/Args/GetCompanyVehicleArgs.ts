import { ArgsType, Field } from '@nestjs/graphql';

import { GetVehicleArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export class GetCompanVehicleArgs extends GetVehicleArgs {
  @Field({ nullable: true })
  id?: string;
}
