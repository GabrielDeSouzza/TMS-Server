export abstract class CreateLegalContractDTO {
  contract_number: string;

  legal_client_id: string;

  carrier_company_id: string;

  observations?: string;

  effective_date: Date;

  delivery_conditions: string;

  updated_by: string;

  created_by: string;
}
