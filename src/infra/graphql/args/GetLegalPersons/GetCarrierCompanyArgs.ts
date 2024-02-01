import { ArgsType, Field } from '@nestjs/graphql';

import { GetLegalPersonArgs } from './GetLegalPersonArgs';

@ArgsType()
export class GetCarrierCompanyArgs extends GetLegalPersonArgs {
  @Field({ nullable: true })
  legalClientId?: string;
}
