import { ArgsType, Field } from '@nestjs/graphql';

import { type GetPhysicalCustomerCteDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerCteDto';

@ArgsType()
export abstract class GetPhysicalCustomerCteArgs
  implements GetPhysicalCustomerCteDTO
{
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  acessKey?: string;
  @Field({ nullable: true })
  cteNumber?: string;
}
