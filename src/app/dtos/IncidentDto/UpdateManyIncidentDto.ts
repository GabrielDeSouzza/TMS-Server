import { type IIncident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export abstract class UpdateManyIncidentDTO implements Partial<IIncident> {
  id: string;
  date_incident?: Date;
  date_resolved?: Date;
  order_process_id?: string;
  description?: string;
}
