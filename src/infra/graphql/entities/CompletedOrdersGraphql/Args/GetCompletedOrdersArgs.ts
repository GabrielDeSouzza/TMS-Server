import { ArgsType, Field } from '@nestjs/graphql';

import { type GetCompletedOrdersDTO } from 'domain/dto/repositories/getDataDtos/GetCompletedOrdersDto';

import { GetVehicleTypeArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export class GetCompletedOrdersArgs implements GetCompletedOrdersDTO {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  order_processing?: string;
  @Field(() => GetVehicleTypeArgs, { nullable: true })
  vehicleData?: GetVehicleTypeArgs;
}
