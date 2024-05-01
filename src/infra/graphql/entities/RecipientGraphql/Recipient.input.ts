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
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IRecipient } from 'domain/entities/Recipient/Recipient';

import {
  LegalPersonInput,
  LegalPersonUpdateInput,
} from '../LegalPersonGraphql/LegalPerson.input';
import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';

@InputType()
export class RecipientInput
  implements Omit<IRecipient, 'id' | 'created_at' | 'updated_at'>
{
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  legal_person_id?: string;

  @Field(() => NaturalPersonInput, { nullable: true })
  @Type(() => NaturalPersonInput)
  @IsObject()
  @IsOptional()
  NaturalPerson?: NaturalPersonInput;

  @Field(() => LegalPersonInput, { nullable: true })
  @Type(() => LegalPersonInput)
  @IsObject()
  @IsOptional()
  LegalPerson?: LegalPersonInput;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  natural_person_id?: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class RecipientUpdateInput extends PartialType(
  OmitType(RecipientInput, [
    'legal_person_id',
    'natural_person_id',
    'created_by',
    'NaturalPerson',
    'LegalPerson',
  ]),
) {
  @HideField()
  updated_by: string;
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson: NaturalPersonUpdate;
  @Field(() => LegalPersonUpdateInput, { nullable: true })
  LegalPerson: LegalPersonUpdateInput;
}

@InputType()
export class RecipientUpdateManyInput extends PartialType(RecipientInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
