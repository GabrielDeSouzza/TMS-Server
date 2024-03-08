import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IPhysicalCustomerMerchandise {
  id?: string;
  codMerchandise: string;
  amount: number;
  description: string;
  mass: number;
  volume: number;
  value: number;
  physicalCustomerOrderId: string;
}

export class PhysicalCustomerMerchandise extends Entity {
  private props: IPhysicalCustomerMerchandise;

  constructor(
    props: Replace<
      IPhysicalCustomerMerchandise,
      { created_at?: Date; updated_at?: Date }
    >,
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
    fieldsValidation.push(
      {
        field: this.props.amount,
        fieldName: 'Amount',
        maxLength: 5000,
      },
      {
        field: this.props.codMerchandise,
        fieldName: 'Cod Merchandise',
        maxLength: 80,
      },
      {
        field: this.props.description,
        fieldName: 'Description',
        maxLength: 80,
      },
      {
        field: this.props.codMerchandise,
        fieldName: 'Mass',
        maxLength: 100_000,
      },
      {
        field: this.props.value,
        fieldName: 'Value',
        maxLength: 100_000,
      },
      {
        field: this.props.physicalCustomerOrderId,
        fieldName: 'Physical Customer Order',
        maxLength: 200,
      },
    );
    this.notification.requiredField('Merchandise', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get codMerchandise(): string {
    return this.props.codMerchandise;
  }

  set codMerchandise(codMerchandise: string) {
    this.props.codMerchandise = codMerchandise;
  }

  get amount(): number {
    return this.props.amount;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get mass(): number {
    return this.props.mass;
  }

  set mass(mass: number) {
    this.props.mass = mass;
  }

  get volume(): number {
    return this.props.volume;
  }

  set volume(volume: number) {
    this.props.volume = volume;
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
}
