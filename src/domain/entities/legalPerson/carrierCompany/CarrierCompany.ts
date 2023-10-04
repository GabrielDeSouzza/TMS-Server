import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type LegalPerson } from '../legalPerson/LegalPerson';

interface ICarrierCompany {
  id?: string;
  cnpj?: string;
  LegalPerson: LegalPerson;
  updated_at: Date;
  created_at: Date;
}

export class CarrierCompany extends Entity {
  private _id: string;
  private props: ICarrierCompany;

  constructor(
    props: Replace<ICarrierCompany, { created_at?: Date; updated_at?: Date }>,
  ) {
    super();

    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      updated_at: new Date(),
      created_at: props.created_at ?? new Date(),
    };
    this.validate();

    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();

      throw new NotificationError(errors);
    }
  }

  validate() {
    const fieldsValidation: Array<IValidationField> =
      new Array<IValidationField>();
    fieldsValidation.push({
      field: this.props.cnpj,
      fieldName: 'CNPJ',
      maxLength: 14,
      minLength: 14,
      isNullAble: true,
    });
    this.props.LegalPerson.validate();
    this.notification.requiredField('CarrierCompany', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string {
    return this.props.cnpj;
  }

  public set LegalPerson(legalPerson: LegalPerson) {
    this.props.LegalPerson = legalPerson;
  }

  public get legalPerson(): LegalPerson {
    return this.props.LegalPerson;
  }
  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
