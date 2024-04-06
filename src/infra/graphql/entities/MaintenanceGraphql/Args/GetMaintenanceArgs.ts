import { ArgsType, Field } from '@nestjs/graphql';

import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';

@ArgsType()
export class GetMaintenanceArgs implements GetMaintenanceDTO {
  @Field()
  id?: string;
}
