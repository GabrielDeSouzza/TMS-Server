import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereManifestTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  order_processing_id?: StringFilterDTO;
  manifest_url?: StringFilterDTO;
  emission_date?: DateTimeFilterDTO;
  number?: StringFilterDTO;
  serie?: StringFilterDTO;
  num_protocol?: StringFilterDTO;
  acess_key?: StringFilterDTO;
}

export abstract class SortByManifestTypeDTO {
  id?: 'asc' | 'desc';
  order_processing_id?: 'asc' | 'desc';
  manifest_url?: 'asc' | 'desc';
  emission_date?: 'asc' | 'desc';
  number?: 'asc' | 'desc';
  serie?: 'asc' | 'desc';
  num_protocol?: 'asc' | 'desc';
  acess_key?: 'asc' | 'desc';
}

export class FindAllManifestWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByManifestTypeDTO;
  where?: WhereManifestTypeDTO;
}

export abstract class CountManifestRequestDTO {
  where?: WhereManifestTypeDTO;
}
