import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

import { TypeMaintenanceProps } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

@ArgsType()
export class GetTypeOfMaintenanceArgs {
  @Field({ nullable: true })
  id?: string;
  typeData?: GetTypeMaintenanceData;
}

@InputType()
export class GetTypeMaintenanceData {
  @Field()
  description: string;
  @Field(() => TypeMaintenanceProps)
  typeMaintenance: TypeMaintenanceProps;
}

registerEnumType(TypeMaintenanceProps, {
  name: 'TypeMaintenanceEnum',
});
