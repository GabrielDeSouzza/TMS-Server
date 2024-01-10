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
  physicalCustomerOrdemId: string;
  updated_at: Date;
  created_at: Date;
  updated_by: string;
  created_by: string;
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
        field: this.props.physicalCustomerOrdemId,
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

  get physicalCustomerOrdemId(): string {
    return this.props.physicalCustomerOrdemId;
  }

  set physicalCustomerOrdemId(physicalCustomerOrdemId: string) {
    this.props.physicalCustomerOrdemId = physicalCustomerOrdemId;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get created_at(): Date {
    return this.props.created_at;
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
