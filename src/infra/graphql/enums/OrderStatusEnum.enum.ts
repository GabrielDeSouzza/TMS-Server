import { registerEnumType } from '@nestjs/graphql';

export enum statusOrderEmum {
  CREATED = 'CREATED',
  IN_PROCESSING = 'IN_PROCESSING',
  CANCELED = 'IN_INCIDENT',
  IN_INCIDENT = 'IN_INCIDENT',
  COMPLETE = 'COMPLETE',
}
registerEnumType(statusOrderEmum, { name: 'StatusOrder' });
