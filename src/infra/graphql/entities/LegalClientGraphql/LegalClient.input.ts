import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type ILegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';

import {
  LegalPersonUpdateInput,
  LegalPersonInput,
} from '../LegalPersonGraphql/LegalPerson.input';

@InputType()
export class LegalClientInput
  implements
    Omit<ILegalClient, 'id' | 'created_at' | 'updated_at' | 'legal_person_id'>
{
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  legal_person_id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  branch: string;
  @Field(() => LegalPersonInput, { nullable: true })
  @IsObject()
  @IsOptional()
  LegalPerson?: LegalPersonInput;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  @IsOptional()
  created_by?: string;
}
@InputType()
export class LegalClientUpdateInput extends PartialType(
  OmitType(LegalClientInput, ['LegalPerson']),
) {
  @Field(() => LegalPersonUpdateInput)
  LegalPerson: LegalPersonUpdateInput;
}

@InputType()
export class LegalClientUpdateManyInput extends PartialType(LegalClientInput) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
