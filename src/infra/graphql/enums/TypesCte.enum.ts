import { registerEnumType } from '@nestjs/graphql';

export enum typeCteEnum {
  NORMAL_CTE = 'Normal',
  COMPLEMENTARY_CTE = 'Complementar',
  CANCELLATION_CTE = 'Anulação',
  REPLACEMENT_CTE = 'Substituição',
  REROUTING_CTE = 'Redespacho',
  INTERMEDIATE_REROUTING_CTE = 'Redespacho Intermediário',
  SUBCONTRACTING_CTE = 'Subcontratação',
  STORAGE_CTE = 'Armazenagem',
  STORAGE_TRANSIT_CTE = 'Armazenagem e Transbordo',
}
registerEnumType(typeCteEnum, { name: 'TypesCteEnum' });
