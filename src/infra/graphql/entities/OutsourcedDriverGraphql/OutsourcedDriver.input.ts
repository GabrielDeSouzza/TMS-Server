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

import {
  ContractOutsoucedDriverUpdateInput,
  ContractOutsourcedDriverReferecesInput,
} from '../ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.input';
import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';
import {
  OutsourcedVehicleInput,
  OutsourcedVehicleUpdateInput,
} from '../OutsourcedVehicle/OutsourcedVehicle.input';

@InputType()
export class OutsourcedDriverInput
  implements Omit<IOutsourcedDriver, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  @Allow()
  outsourced_vehicle_id: string;
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
  @Field()
  @IsBoolean()
  company_vehicle: boolean;
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
  @Type(() => OutsourcedVehicleInput)
  @IsObject()
  @IsOptional()
  @Field(() => OutsourcedVehicleInput, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleInput;
}

@InputType()
export class OutsourcedDriverUpdateInput extends PartialType(
  OmitType(OutsourcedDriverInput, [
    'ContractOutsourcedDriver',
    'OutsourcedVehicle',
    'NaturalPerson',
  ]),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson: NaturalPersonUpdate;
  @Field(() => ContractOutsoucedDriverUpdateInput, { nullable: true })
  ContractOutsourcedDriver?: ContractOutsoucedDriverUpdateInput;
  @Field(() => OutsourcedVehicleUpdateInput, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleUpdateInput;
}
