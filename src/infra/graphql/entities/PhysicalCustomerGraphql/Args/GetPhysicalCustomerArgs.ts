import { ArgsType, Field } from '@nestjs/graphql';

import { GetNaturalPersonArgs } from '../../NaturalPersonGraphql/Args/GetNaturalPersonArgs';

@ArgsType()
export abstract class GetPhysicalCustomerArgs extends GetNaturalPersonArgs {
  @Field({ nullable: true })
  id?: string;
}
