import {
  type SortByInvoiceForLegalClientTypeDTO,
  type WhereInvoiceForLegalClientTypeDTO,
} from 'domain/dto/repositories/whereDtos/InvoiceForLegalPeronRepositoryDto';

export abstract class GetAllInvoiceForLegalClientDTO {
  limit: number;
  offset: number;
  sort?: SortByInvoiceForLegalClientTypeDTO;
  where?: WhereInvoiceForLegalClientTypeDTO;
}
