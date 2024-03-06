import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ICarrierCompany {
  id?: string;
  legalPersonId: string;
  rntrc: string;
  updated_at: Date;
  created_at: Date;
  updated_by: string;
  created_by: string;
}

export class CarrierCompany extends Entity {
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
    fieldsValidation.push(
      {
        field: this.props.legalPersonId,
        fieldName: 'legalPersonId',
        maxLength: 1000,
      },
      {
        field: this.props.rntrc,
        maxLength: 13,
        minLength: 13,
        fieldName: 'RNTRC',
      },
    );
    this.notification.requiredField('CarrierCompany', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public get rntrc(): string {
    return this.props.rntrc;
  }
  public set rntrc(rntrc: string) {
    this.props.rntrc = rntrc;
  }

  public set legalPersonId(legalPersonId: string) {
    this.props.legalPersonId = legalPersonId;
  }

  public get legalPersonId(): string {
    return this.props.legalPersonId;
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
  get updated_by(): string {
    return this.props.updated_by;
  }

  set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  get created_by(): string {
    return this.props.created_by;
  }

  set created_by(created_by: string) {
    this.props.created_by = created_by;
  }
}
