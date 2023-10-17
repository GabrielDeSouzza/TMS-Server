import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type OutsourcedDriver } from '../outsourcedDriver/OutsourcedDriver';

export interface IContractOutsourcedDriver {
  id?: string;
  type: string;
  situation: string;
  start_at: Date;
  end_at?: Date;
  created_at: Date;
  updated_at: Date;
  cpf?: string;
  OutsourcedDriver: OutsourcedDriver;
}
export class ContractOutsourcedDriver extends Entity {
  private _id: string;
  private props: IContractOutsourcedDriver;

  constructor(
    props: Replace<
      IContractOutsourcedDriver,
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
        isNullAble: true,
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
    this.props.OutsourcedDriver.validate();
  }
  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public set type(type: string) {
    this.props.type = type;
  }

  public get type(): string {
    return this.props.type;
  }

  public set situation(situation: string) {
    this.props.situation = situation;
  }

  public get situation(): string {
    return this.props.situation;
  }

  public set start_at(startAt: Date) {
    this.props.start_at = startAt;
  }

  public get start_at(): Date {
    return this.props.start_at;
  }

  public set end_at(endAt: Date | undefined) {
    this.props.end_at = endAt;
  }

  public get end_at(): Date | undefined {
    return this.props.end_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
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

  public set OutsourcedDriver(outsourcedDriver: OutsourcedDriver) {
    this.props.OutsourcedDriver = outsourcedDriver;
  }

  public get OutsourcedDriver(): OutsourcedDriver {
    return this.props.OutsourcedDriver;
  }
}
