import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';

export abstract class CreateMaintenanceCompanyDTO {
  legal_person_id?: string;

  specialty_maintenance: string;

  LegalPerson?: CreateLegalPersonDTO;

  updated_by: string;

  created_by?: string;
}
