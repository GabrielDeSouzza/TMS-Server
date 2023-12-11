import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Replace } from 'helpers/Replace';

export interface IContractOutsourcedDriver {
  id?: string;
  type: string;
  situation: string;
  start_at: Date;
  end_at?: Date;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  cpf: string;
  outsourced_driver_id: string;
}
export class ContractOutsourcedDriver extends Entity {
  private props: IContractOutsourcedDriver | Partial<IContractOutsourcedDriver>;

  constructor(
    props: Replace<
      IContractOutsourcedDriver | Partial<IContractOutsourcedDriver>,
      { created_at?: Date; updated_at?: Date }
    >,
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
        field: this.props.cpf,
        fieldName: 'CPF',
        maxLength: 11,
        minLength: 11,
      },
      {
        field: this.props.end_at,
        fieldName: 'End at',
        maxLength: 15,
        isNullAble: true,
      },
      {
        field: this.props.situation,
        fieldName: 'Situation',
        maxLength: 50,
      },
      { field: this.props.start_at, fieldName: 'Start_at', maxLength: 15 },
      { field: this.props.type, fieldName: 'Type', maxLength: 50 },
    );
    this.notification.requiredField(
      'ContractOutsourcedDriver',
      fieldsValidation,
    );
  }
  public get id(): string {
    return this.props.id;
  }

  public set type(type: string | undefined) {
    this.props.type = type;
  }

  public get type(): string {
    return this.props.type;
  }

  public set situation(situation: string | undefined) {
    this.props.situation = situation;
  }

  public get situation(): string {
    return this.props.situation;
  }

  public set start_at(startAt: Date | undefined) {
    this.props.start_at = startAt;
  }

  public get start_at(): Date {
    return this.props.start_at;
  }

  public set end_at(endAt: Date | undefined | undefined) {
    this.props.end_at = endAt;
  }

  public get end_at(): Date | undefined {
    return this.props.end_at;
  }

  public set created_at(created_at: Date | undefined) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(update_at: Date | undefined) {
    this.props.updated_at = update_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set outsourced_driver_id(outsourced_driver_id: string) {
    this.props.outsourced_driver_id = outsourced_driver_id;
  }

  public get outsourced_driver_id(): string {
    return this.props.outsourced_driver_id;
  }

  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }
  public set created_by(updated_by: string) {
    this.props.created_by = updated_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
}
