import { randomUUID } from 'node:crypto';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IFreightExpense {
  id?: string;
  expenseName: string;
  value: number;
  physicalCustomerOrderId?: string;
  legalClientOrderId?: string;
}

export class FreightExpense extends Entity {
  private props: IFreightExpense;

  constructor(props: IFreightExpense) {
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
    fieldsValidation.push(
      {
        field: this.props.expenseName,
        fieldName: 'Expense Name',
        maxLength: 80,
      },
      {
        field: this.props.legalClientOrderId,
        fieldName: 'Order Id',
        maxLength: 1000,
        isNullAble: true,
      },
      {
        field: this.props.value,
        fieldName: 'Value',
        maxLength: 8,
      },
    );

    this.notification.requiredField('FreightExpense', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get physicalCustomerOrderId(): string {
    return this.props.physicalCustomerOrderId;
  }

  set physicalCustomerOrderId(physicalCustomerOrderId: string) {
    this.props.physicalCustomerOrderId = physicalCustomerOrderId;
  }
  get legalClientOrderId(): string {
    return this.props.legalClientOrderId;
  }

  set legalClientOrderId(legalClientOrderId: string) {
    this.props.legalClientOrderId = legalClientOrderId;
  }
  get expenseName(): string {
    return this.props.expenseName;
  }

  set expenseName(expenseName: string) {
    this.props.expenseName = expenseName;
  }
}
