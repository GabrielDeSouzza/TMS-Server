import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateManyMaintenanceCompanyDTO {
  specialty_maintenance?: string;

  LegalPerson?: UpdateLegalPersonDTO;

  id: string;
}
