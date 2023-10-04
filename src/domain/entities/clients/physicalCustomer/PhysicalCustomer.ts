import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { type NaturalPerson } from '../../../entities/personEntities/naturalPerson/NaturalPerson';
import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface IPhysicalCustomer {
  id?: string;
  branch?: string;
  NaturalPerson: NaturalPerson;
  cpf?: string;
  updated_at: Date;
  created_at: Date;
}

export class PhysicalCustomer extends Entity {
  private _id: string;
  private props: IPhysicalCustomer;

  constructor(
    props: Replace<IPhysicalCustomer, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.branch,
        fieldName: 'Branch',
        maxLength: 80,
        minLength: 80,
        isNullAble: true,
      },
    );
    this.props.NaturalPerson.validate();
    this.notification.requiredField('PhysicalCustomer', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public set branch(branch: string) {
    this.props.branch = branch;
  }

  public get branch(): string {
    return this.props.branch;
  }

  public set NaturalPerson(naturalPerson: NaturalPerson) {
    this.props.NaturalPerson = naturalPerson;
  }

  public get NaturalPerson(): NaturalPerson {
    return this.props.NaturalPerson;
  }

  public set cpf(cpf: string | undefined) {
    this.props.cpf = cpf;
  }

  public get cpf(): string | undefined {
    return this.props.cpf;
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
