import { ArgsType } from '@nestjs/graphql';

import { GetVehicleArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export abstract class GetOutsourcedTransportVehicleArgs extends GetVehicleArgs {
  id?: string;
}
