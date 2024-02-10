import { ArgsType, Field } from '@nestjs/graphql';

import { GetLegalPersonArgs } from '../../LegalPersonGraphql/Args/GetLegalPersonArgs';

@ArgsType()
export class GetLegalClientArgs extends GetLegalPersonArgs {
  @Field({ nullable: true })
  legalClientId?: string;
}
