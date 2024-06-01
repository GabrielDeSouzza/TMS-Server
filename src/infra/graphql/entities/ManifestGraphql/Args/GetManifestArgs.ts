import { ArgsType, Field } from '@nestjs/graphql';

import { type GetManifestDTO } from 'domain/dto/repositories/getDataDtos/GetManifestDto';

@ArgsType()
export class GetManifestArgs implements GetManifestDTO {
  @Field()
  id?: string;
}
