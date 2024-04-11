import { type IIncident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export abstract class UpdateIncidentDTO implements Partial<IIncident> {
  date_incident?: Date;
  date_resolved?: Date;
  order_process_id?: string;
  updated_by?: string;
  description?: string;
}
