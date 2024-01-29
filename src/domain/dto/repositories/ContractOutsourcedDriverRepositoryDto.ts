import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereContractOutsourcedDriverTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  type?: StringFilterDTO;
  situation?: StringFilterDTO;
  start_at?: DateTimeFilterDTO;
  end_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
  cpf?: StringFilterDTO;
  outsourced_driver_id?: StringFilterDTO;
}

export abstract class SortByContractOutsourcedDriverTypeDTO {
  id?: 'asc' | 'desc';
  type?: 'asc' | 'desc';
  situation?: 'asc' | 'desc';
  start_at?: 'asc' | 'desc';
  end_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  cpf?: 'asc' | 'desc';
  outsourced_driver_id?: 'asc' | 'desc';
}

export class FindAllContractOutsourcedDriverWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByContractOutsourcedDriverTypeDTO;
  where?: WhereContractOutsourcedDriverTypeDTO;
}
