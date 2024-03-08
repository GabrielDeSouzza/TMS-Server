import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerMerchandiseOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer-merchandise/physical-customer-merchandise-order-by-with-relation.input';
import { PhysicalCustomerMerchandiseWhereInput } from 'infra/graphql/prisma-generated/physical-customer-merchandise/physical-customer-merchandise-where.input';

@ArgsType()
export class PhysicalCustomerMerchandiseWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => PhysicalCustomerMerchandiseWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerMerchandiseWhereInput)
  @IsOptional()
  where?: PhysicalCustomerMerchandiseWhereInput;

  @Field(() => PhysicalCustomerMerchandiseOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerMerchandiseOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerMerchandiseOrderByWithRelationInput;
}
