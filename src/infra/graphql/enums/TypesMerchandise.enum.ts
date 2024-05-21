import { registerEnumType } from '@nestjs/graphql';

export enum typeMerchandiseEnum {
  PERISHABLES = 'Perecíveis',
  NON_PERISHABLES = 'Não Perecíveis',
  HAZARDOUS = 'Perigosas',
  DRY = 'Secas',
  LIQUID = 'Líquidas',
  RAW_MATERIALS = 'Matérias-Primas',
  FINISHED_PRODUCTS = 'Produtos Acabados',
  INDUSTRIAL_SUPPLIES = 'Insumos Industriais',
  CONSUMER_GOODS = 'Mercadorias de Consumo',
  BULK = 'A granel',
  PACKAGED = 'Embaladas',
  CONTAINERIZED = 'Containerizadas',
  SPECIAL_CARGO = 'Carga Especial',
}
registerEnumType(typeMerchandiseEnum, { name: 'TypeMerchandise' });
