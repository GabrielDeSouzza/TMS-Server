import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ILegalClientOrder {
  id?: string;
  order: string;
  legal_contract_id: string;
  quote_table_id: string;
  updated_at?: Date;
  created_at?: Date;
  created_by?: string;
  updated_by: string;
}

export class LegalClientOrder extends Entity {
  private props: ILegalClientOrder;

  constructor(
    props: Replace<ILegalClientOrder, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.order,
        fieldName: 'Order',
        maxLength: 999,
      },
      {
        field: this.props.legal_contract_id,
        fieldName: 'Legal Contract',
        maxLength: 999,
      },
      {
        field: this.props.quote_table_id,
        fieldName: 'Quote Table',
        maxLength: 999,
      },
    );

    this.notification.requiredField('LegalClientOrder', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public get legal_contract_id(): string {
    return this.props.legal_contract_id;
  }
  public set legal_contract_id(legal_contract_id: string) {
    this.props.legal_contract_id = legal_contract_id;
  }
  public set order(order: string) {
    this.props.order = order;
  }
  public get order(): string {
    return this.props.order;
  }

  public get quote_table_id(): string {
    return this.props.quote_table_id;
  }

  public set quote_table_id(quote_table_id: string) {
    this.props.quote_table_id = quote_table_id;
  }
  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }

  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }
}
