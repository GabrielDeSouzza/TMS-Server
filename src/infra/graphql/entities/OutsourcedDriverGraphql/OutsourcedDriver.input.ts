import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  Allow,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { type IOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

import { ContractOutsourcedDriverReferecesInput } from '../ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.input';
import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class OutsourcedDriverInput
  implements Omit<IOutsourcedDriver, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  natural_person_id: string;

  @Field(() => NaturalPersonInput)
  @Type(() => NaturalPersonInput)
  @IsNotEmptyObject()
  NaturalPerson: NaturalPersonInput;
  @Field()
  @IsString()
  @IsNotEmpty()
  cnh: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  cnh_category: string;
  @Field()
  @IsDate()
  @Type(() => Date)
  cnh_expiration: Date;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  company_vehicle_id?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  outsourced_vehicle_id?: string;
  @Field()
  @IsBoolean()
  course_mopp: boolean;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
  @Field(() => ContractOutsourcedDriverReferecesInput)
  @Type(() => ContractOutsourcedDriverReferecesInput)
  @IsObject()
  ContractOutsourcedDriver: ContractOutsourcedDriverReferecesInput;
}

@InputType()
export class OutsourcedDriverUpdateInput extends PartialType(
  OmitType(OutsourcedDriverInput, [
    'ContractOutsourcedDriver',
    'NaturalPerson',
  ]),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson: NaturalPersonUpdate;
}
