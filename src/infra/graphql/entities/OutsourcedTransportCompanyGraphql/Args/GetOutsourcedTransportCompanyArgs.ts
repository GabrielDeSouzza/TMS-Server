import { ArgsType, Field } from '@nestjs/graphql';

import { GetLegalPersonArgs } from '../../LegalPersonGraphql/Args/GetLegalPersonArgs';

@ArgsType()
export class GetOutsourcedTransportCompanyArgs extends GetLegalPersonArgs {
  @Field({ nullable: true })
  id?: string;
}
