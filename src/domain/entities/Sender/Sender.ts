import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Replace } from 'helpers/Replace';

export interface ISender {
  id?: string;
  legal_person_id?: string;
  natural_person_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  updated_by: string;
}

export class Sender extends Entity {
  private props: ISender;

  constructor(
    props: Replace<ISender, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.legal_person_id,
        fieldName: 'Legal Person',
        maxLength: 2000,
        isNullAble: true,
      },
      {
        field: this.props.natural_person_id,
        fieldName: 'Natural Person',
        maxLength: 2000,
        isNullAble: true,
      },
    );
    this.notification.requiredField('Sender', fieldsValidation);
  }
  get id(): string | undefined {
    return this.props.id;
  }

  get legal_person_id(): string {
    return this.props.legal_person_id;
  }

  set legal_person_id(legal_person_id: string) {
    this.props.legal_person_id = legal_person_id;
  }

  get natural_person_id(): string {
    return this.props.natural_person_id;
  }

  set natural_person_id(natural_person_id: string) {
    this.props.natural_person_id = natural_person_id;
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

  get created_by(): string | undefined {
    return this.props.created_by;
  }

  set created_by(created_by: string | undefined) {
    this.props.created_by = created_by;
  }
}
