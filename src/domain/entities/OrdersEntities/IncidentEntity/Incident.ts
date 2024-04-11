import { randomUUID } from 'node:crypto';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IIncident {
  id?: string;
  description: string;
  date_incident: Date;
  order_process_id: string;
  date_resolved?: Date;
  created_by: string;
  updated_by: string;
  updated_at?: Date;
  created_at?: Date;
}

export class Incident extends Entity {
  private props: IIncident;

  constructor(props: IIncident) {
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
        field: this.props.description,
        fieldName: 'Description',
        maxLength: 100,
      },
      {
        field: this.props.date_incident,
        fieldName: 'Date Incident',
        maxLength: 20,
      },
      {
        field: this.props.date_resolved,
        fieldName: 'Date Resolved',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.order_process_id,
        fieldName: 'OrderProcess',
        maxLength: 1000,
      },
    );

    this.notification.requiredField('Incident', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }
  set id(id: string) {
    this.props.id = id;
  }
  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }
  get date_incident(): Date {
    return this.props.date_incident;
  }

  set date_incident(date_incident: Date) {
    this.props.date_incident = date_incident;
  }

  get date_resolved(): Date {
    return this.props.date_resolved;
  }

  set date_resolved(date_resolved: Date) {
    this.props.date_resolved = date_resolved;
  }
  get order_process_id(): string {
    return this.props.order_process_id;
  }

  set order_process_id(order_process_id: string) {
    this.props.order_process_id = order_process_id;
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
