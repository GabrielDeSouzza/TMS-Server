import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface ILegalClient {
  id?: string;
  branch: string;
  legal_person_id: string;
  updated_at: Date;
  created_at?: Date;
  updated_by: string;
  created_by?: string;
}

export class LegalClient extends Entity {
  private props: ILegalClient;

  constructor(
    props: Replace<ILegalClient, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.branch,
        fieldName: 'Branch',
        maxLength: 80,
      },
      {
        field: this.props.legal_person_id,
        fieldName: 'Legal Person',
        maxLength: 200,
      },
      {
        field: this.props.created_at,
        fieldName: 'Created At',
        maxLength: 20,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 20,
      },
      {
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 200,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated by',
        maxLength: 200,
      },
    );

    this.notification.requiredField('LegalClient', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get branch(): string {
    return this.props.branch;
  }

  set branch(branch: string) {
    this.props.branch = branch;
  }

  get legal_person_id(): string {
    return this.props.legal_person_id;
  }

  set legal_person_id(legal_person_id: string) {
    this.props.legal_person_id = legal_person_id;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(created_at: Date) {
    this.props.created_at = created_at;
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
