import { randomUUID } from 'node:crypto';

import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface IMerchandise {
  branch?: string;
  NaturalPerson: NaturalPerson;
  cpf?: string;
  updated_at: Date;
  created_at: Date;
}

export class Merchandise extends Entity {
  private _id: string;
  private props: IMerchandise;

  constructor(
    props: Replace<IMerchandise, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
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
        isNullAble: true,
      },
    );
    this.props.NaturalPerson.validate();
    this.notification.requiredField('Merchandise', fieldsValidation);
  }

  public get id(): string {
    return this._id;
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
