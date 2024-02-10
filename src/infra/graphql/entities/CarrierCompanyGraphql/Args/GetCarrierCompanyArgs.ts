import { ArgsType, Field } from '@nestjs/graphql';

import { GetLegalPersonArgs } from 'infra/graphql/entities/LegalPersonGraphql/Args/GetLegalPersonArgs';

@ArgsType()
export class GetCarrierCompanyArgs extends GetLegalPersonArgs {
  @Field({ nullable: true })
  legalClientId?: string;
}
