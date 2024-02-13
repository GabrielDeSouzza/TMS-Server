import { type CreateContractOutsourcedDriverDTO } from '../ContractOutsourcedDriverDto/CreateContractOutsourcedDriverDto';
import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';
import { type CreateOutsourcedVehicleDTO } from '../OutsoucedVehicleDto/CreateOutsourcedVehicleDto';

export abstract class CreateOutsourcedDriverDTO {
  natural_person_id?: string;

  NaturalPerson: CreateNaturalPersonDTO;

  cnh: string;

  cnh_category: string;

  cnh_expiration: Date;

  company_vehicle_id?: string;

  outsourced_vehicle_id?: string;

  course_mopp: boolean;

  updated_by: string;

  created_by: string;

  ContractOutsourcedDriver: CreateContractOutsourcedDriverDTO;

  OutsourcedVehicle?: CreateOutsourcedVehicleDTO;
}
