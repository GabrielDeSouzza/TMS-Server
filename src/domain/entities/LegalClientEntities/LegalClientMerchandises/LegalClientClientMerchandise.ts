import { randomUUID } from 'node:crypto';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ILegalClientMerchandise {
  id?: string;
  codMerchandise: string;
  amount: number;
  description: string;
  mass: number;
  volume: number;
  value: number;
  legal_client_order_id: string;
  invoice_legal_client: string;
}

export class LegalClientMerchandise extends Entity {
  private props: ILegalClientMerchandise;

  constructor(props: ILegalClientMerchandise) {
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
        maxLength: 100,
      },
      {
        field: this.props.codMerchandise,
        fieldName: 'Cod Merchandise',
        maxLength: 100,
      },
      {
        field: this.props.description,
        fieldName: 'Description',
        maxLength: 100,
      },
      {
        field: this.props.legal_client_order_id,
        fieldName: 'Legal Client Order',
        maxLength: 200,
      },
      {
        field: this.props.mass,
        fieldName: 'Mass',
        maxLength: 1_000_000,
      },
      {
        field: this.props.value,
        fieldName: 'Value',
        maxLength: 100_000_000,
      },
      {
        field: this.props.volume,
        fieldName: 'Volume',
        maxLength: 100_000,
      },
    );
    this.notification.requiredField('LegalClientMerchandise', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  set id(id: string | undefined) {
    this.props.id = id;
  }

  get invoice_legal_client(): string {
    return this.props.invoice_legal_client;
  }

  set invoice_legal_client(invoice_legal_client: string) {
    this.props.invoice_legal_client = invoice_legal_client;
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

  get legal_client_order_id(): string {
    return this.props.legal_client_order_id;
  }

  set legal_client_order_id(legal_client_order_id: string) {
    this.props.legal_client_order_id = legal_client_order_id;
  }
}
