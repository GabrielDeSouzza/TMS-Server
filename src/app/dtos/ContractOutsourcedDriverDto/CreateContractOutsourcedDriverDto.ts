export abstract class CreateContractOutsourcedDriverDTO {
  type: string;

  contract_number: string;

  situation: string;

  start_at: Date;

  end_at?: Date;

  updated_by: string;

  created_by: string;

  cpf: string;

  outsourced_driver_id?: string;
}
