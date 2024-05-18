import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import {
  type FindAllFreightIncidentWhereRequestDTO,
  type CountFreightIncidentWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { type Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export abstract class IncidentRepository {
  abstract countIncident(
    request: CountFreightIncidentWhereRequestDTO,
  ): Promise<number>;
  abstract getIncident(request: GetIncidentDTO): Promise<Incident>;
  abstract findAllIncident(
    parameters: FindAllFreightIncidentWhereRequestDTO,
  ): Promise<Incident[]>;
  abstract createIncident(expense: Incident): Promise<Incident>;
  abstract updateIncident(id: string, expense: Incident): Promise<Incident>;
  abstract updateManyIncident(data: Incident[]): Promise<Incident[]>;
  abstract deleteIncident(id: string): Promise<Incident>;
  abstract deleteManyIncident(ids: string[]): Promise<Incident[]>;
}
