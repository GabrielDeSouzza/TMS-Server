import { type GetNaturalPersonArgs } from 'infra/graphql/entities/NaturalPersonGraphql/Args/GetNaturalPersonArgs';

import { type GetLegalPersonDTO } from './GetLegalPersonDto';

export abstract class GetRecipientDTO {
  id?: string;
  legalPerson?: GetLegalPersonDTO;
  naturalPerson?: GetNaturalPersonArgs;
}
