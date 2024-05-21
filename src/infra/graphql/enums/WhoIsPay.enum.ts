import { registerEnumType } from '@nestjs/graphql';

export enum whoIsPayEmum {
  SENDER = 'SENDER',
  RECIPIENT = 'RECIPIENT',
  CARRIER = 'CARRIER',
  SERVICE_TAKER = 'SERVICE_TAKER',
}
registerEnumType(whoIsPayEmum, { name: 'WhoIsPay' });
