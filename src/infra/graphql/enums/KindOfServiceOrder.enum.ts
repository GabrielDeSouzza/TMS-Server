import { registerEnumType } from '@nestjs/graphql';

export enum kindOfServicerOrderEnum {
  LTL = 'CARGA FRACIONADA',
  LOAD_CAPACITY = 'CARGA LOTAÇÃO',
  HAZARDOUS_CARGO = 'CARGA PERIGOSA',
  REFRIGERATED_CARGO = 'CARGA REFRIGERADA',
}
registerEnumType(kindOfServicerOrderEnum, { name: 'KindOfServicerOrder' });
