import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type LegalPerson } from '../legalPerson/LegalPerson';

interface ICorporateClient {
  branch: string;
  LegalPerson: LegalPerson;
  cnpj?: string;
  updated_at: Date;
  created_at: Date;
}

export class CorporateClient extends Entity {
  private _id: string;
  private props: ICorporateClient;

  constructor(
    props: Replace<ICorporateClient, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.branch,
        fieldName: 'Bransh',
        maxLength: 80,
      },
      {
        field: this.props.cnpj,
        fieldName: 'CNPJ',
        maxLength: 14,
        minLength: 14,
        isNullAble: true,
      },
    );
    this.props.LegalPerson.validate();
    this.notification.requiredField('CorporateClient', fieldsValidation);
  }

  public get id(): string {
    return this._id;
  }
  public set branch(bransh: string) {
    this.props.branch = bransh;
  }
  public get branch(): string {
    return this.props.branch;
  }

  public set cnpj(cnpj: string | undefined) {
    this.props.cnpj = cnpj;
  }
  public get cnpj(): string | undefined {
    return this.props.cnpj;
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
