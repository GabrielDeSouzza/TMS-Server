import { ArgsType, Field } from '@nestjs/graphql';

import { type GetOrderProcessingDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingDto';

import { GetVehicleTypeArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export class GetOrderProcessingArgs implements GetOrderProcessingDTO {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  order_processing?: string;
  @Field(() => GetVehicleTypeArgs, { nullable: true })
  vehicleData?: GetVehicleTypeArgs;
}
