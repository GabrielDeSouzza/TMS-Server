import { ArgsType, Field } from '@nestjs/graphql';

import { type GetRecipientDTO } from 'domain/dto/repositories/getDataDtos/GetRecipientDto';

import { GetLegalPersonInput } from '../../LegalPersonGraphql/Args/GetLegalPersonArgs';
import { GetNaturalPersonInput } from '../../NaturalPersonGraphql/Args/GetNaturalPersonArgs';

@ArgsType()
export class GetRecipientArgs implements GetRecipientDTO {
  @Field({ nullable: true })
  id?: string;
  @Field(() => GetNaturalPersonInput, { nullable: true })
  naturalPerson?: GetNaturalPersonInput;
  @Field(() => GetLegalPersonInput, { nullable: true })
  legalPerson?: GetLegalPersonInput;
}
