import { type IIncident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export abstract class CreateIncidentDTO implements IIncident {
  description: string;
  date_incident: Date;
  order_process_id: string;
  date_resolved?: Date;
  created_by: string;
  updated_by: string;
}
