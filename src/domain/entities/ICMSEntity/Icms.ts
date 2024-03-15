import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Replace } from 'helpers/Replace';

export interface IIcms {
  id?: string;
  state_origin: string;
  recipient_state: string;
  aliquot: number;
  effective_date: Date;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  updated_by: string;
}

export class Icms extends Entity {
  private props: IIcms;

  constructor(props: Replace<IIcms, { created_at?: Date; updated_at?: Date }>) {
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
        field: this.props.state_origin,
        fieldName: 'State Origin',
        maxLength: 2,
      },
      {
        field: this.props.recipient_state,
        fieldName: 'Recipient_state',
        maxLength: 2,
      },
      {
        field: this.props.effective_date,
        fieldName: 'effective_date',
        maxLength: 20,
      },
      {
        field: this.props.aliquot,
        fieldName: 'Aliquot',
        maxLength: 5,
      },
    );
    this.notification.requiredField('Icms', fieldsValidation);
  }
  get id(): string | undefined {
    return this.props.id;
  }

  get state_origin(): string {
    return this.props.state_origin;
  }

  set state_origin(state_origin: string) {
    this.props.state_origin = state_origin;
  }

  get recipient_state(): string {
    return this.props.recipient_state;
  }

  set recipient_state(recipient_state: string) {
    this.props.recipient_state = recipient_state;
  }

  get effective_date(): Date {
    return this.props.effective_date;
  }

  set effective_date(effective_date: Date) {
    this.props.effective_date = effective_date;
  }

  get aliquot(): number {
    return this.props.aliquot;
  }

  set aliquot(aliquot: number) {
    this.props.aliquot = aliquot;
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
