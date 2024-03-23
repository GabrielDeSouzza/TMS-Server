import { ArgsType, Field } from '@nestjs/graphql';

import { type GetSenderDTO } from 'domain/dto/repositories/getDataDtos/GetSendertDto';

import { GetLegalPersonInput } from '../../LegalPersonGraphql/Args/GetLegalPersonArgs';
import { GetNaturalPersonInput } from '../../NaturalPersonGraphql/Args/GetNaturalPersonArgs';

@ArgsType()
export class GetSenderArgs implements GetSenderDTO {
  @Field({ nullable: true })
  id?: string;
  @Field(() => GetNaturalPersonInput, { nullable: true })
  naturalPerson?: GetNaturalPersonInput;
  @Field(() => GetLegalPersonInput, { nullable: true })
  legalPerson?: GetLegalPersonInput;
}
