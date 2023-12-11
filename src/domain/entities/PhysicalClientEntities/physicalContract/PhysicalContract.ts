import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IPhysicalContract {
  id?: string;
  physical_customer_id: string;
}

export class PhysicalContract extends Entity {
  private props: IPhysicalContract;

  constructor(
    props: Replace<IPhysicalContract, { created_at?: Date; updated_at?: Date }>,
  ) {
    super();

    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
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
      field: this.props.physical_customer_id,
      fieldName: 'Physical Customer',
      maxLength: 80,
      isNullAble: true,
    });
    this.notification.requiredField('PhysicalContract', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set physical_customer_id(physical_customer_id: string) {
    this.props.physical_customer_id = physical_customer_id;
  }

  public get physical_customer_id(): string {
    return this.props.physical_customer_id;
  }
}
