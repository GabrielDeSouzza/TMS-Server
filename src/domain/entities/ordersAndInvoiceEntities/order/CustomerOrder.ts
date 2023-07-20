import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface ICustomerOrder {
  order: string;
  updated_at: Date;
  created_at: Date;
}

export class CustomerOrder extends Entity {
  private _id: string;
  private props: ICustomerOrder;

  constructor(
    props: Replace<ICustomerOrder, { created_at?: Date; updated_at?: Date }>,
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
    fieldsValidation.push({
      field: this.props.order,
      fieldName: 'Order',
      maxLength: 999,
    });

    this.notification.requiredField('CustomerOrder', fieldsValidation);
  }

  public get id(): string {
    return this._id;
  }

  public set order(order: string) {
    this.props.order = order;
  }
  public get order(): string {
    return this.props.order;
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
