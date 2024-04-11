import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import { type FindAllIncidentWhereRequestDTO } from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { type Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export abstract class IncidentRepository {
  abstract getIncident(request: GetIncidentDTO): Promise<Incident>;
  abstract findAllIncident(
    parameters: FindAllIncidentWhereRequestDTO,
  ): Promise<Incident[]>;
  abstract createIncident(expense: Incident): Promise<Incident>;
  abstract updateIncident(id: string, expense: Incident): Promise<Incident>;
}
