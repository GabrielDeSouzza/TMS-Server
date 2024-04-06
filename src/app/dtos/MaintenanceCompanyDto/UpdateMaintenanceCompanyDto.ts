import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateMaintenanceCompanyDTO {
  specialty_maintenance?: string;

  LegalPerson: UpdateLegalPersonDTO;

  updated_by?: string;
}
