import { ArgsType, Field } from '@nestjs/graphql';

import { type GetLegalClientCteDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientCteDto';

@ArgsType()
export abstract class GetLegalClientCteArgs implements GetLegalClientCteDTO {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  acessKey?: string;
  @Field({ nullable: true })
  cteNumber?: string;
}
