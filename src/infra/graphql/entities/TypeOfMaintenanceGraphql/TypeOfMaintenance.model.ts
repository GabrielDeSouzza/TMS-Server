import { Field, ObjectType } from '@nestjs/graphql';

import {
  TypeMaintenanceProps,
  type ITypeOfMaintenance,
} from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

@ObjectType()
export class TypeOfMaintenanceModel implements ITypeOfMaintenance {
  @Field()
  id: string;
  @Field()
  description: string;
  @Field()
  typeMaintenance: TypeMaintenanceProps;
  @Field()
  updated_at?: Date;
  @Field()
  created_at?: Date;
  @Field()
  updated_by: string;

  @Field()
  created_by: string;
}
