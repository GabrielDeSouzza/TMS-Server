import { ArgsType, Field } from '@nestjs/graphql';

import { GetLegalPersonArgs } from './GetLegalPersonArgs';

@ArgsType()
export class GetLegalClientArgs extends GetLegalPersonArgs {
  @Field({ nullable: true })
  legalClientId?: string;
}
