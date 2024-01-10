import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

import { IntFilter } from 'infra/graphql/prisma-generated/prisma/int-filter.input';
import { IntNullableFilter } from 'infra/graphql/prisma-generated/prisma/int-nullable-filter.input';

abstract class WhereLegalClientMerchandiseTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  codMerchandise?: StringFilterDTO;
  amount?: NumberFilterDTO;
  description?: StringFilterDTO;
  mass?: NumberFilterDTO;
  volume?: NumberFilterDTO;
  value?: NumberFilterDTO;
  legalClientOrderId?: StringFilterDTO;
}

abstract class SortByLegalClientMerchandiseTypeDTO {
  id?: 'asc' | 'desc';
  codMerchandise?: 'asc' | 'desc';
  amount?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  mass?: 'asc' | 'desc';
  volume?: 'asc' | 'desc';
  value?: 'asc' | 'desc';
  legalClientOrderId?: 'asc' | 'desc';
}

export class FindAllLegalClientMerchandiseWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientMerchandiseTypeDTO;
  where?: WhereLegalClientMerchandiseTypeDTO;
}
IntNullableFilter;
IntFilter;
