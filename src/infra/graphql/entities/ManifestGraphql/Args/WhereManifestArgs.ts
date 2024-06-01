import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { ManifestOrderByWithRelationInput } from '../../../prisma-generated/manifest/manifest-order-by-with-relation.input';
import { ManifestWhereInput } from '../../../prisma-generated/manifest/manifest-where.input';

@ArgsType()
export class ManifestWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => ManifestWhereInput, { nullable: true })
  @Type(() => ManifestWhereInput)
  @IsOptional()
  where?: ManifestWhereInput;

  @Field(() => ManifestOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => ManifestOrderByWithRelationInput)
  @IsOptional()
  sort?: ManifestOrderByWithRelationInput;
}

@ArgsType()
export class ManifestCountArgs {
  @Field(() => ManifestWhereInput, { nullable: true })
  @Type(() => ManifestWhereInput)
  @IsOptional()
  where?: ManifestWhereInput;
}
