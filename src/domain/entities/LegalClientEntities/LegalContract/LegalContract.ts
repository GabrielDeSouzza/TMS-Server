import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ILegalContract {
  id?: string;
  contract_number: string;
  legal_client_id: string;
  carrier_company_id: string;
  observations?: string;
  effective_date: Date;
  delivery_conditions: string;
  updated_at: Date;
  created_at?: Date;
  updated_by: string;
  created_by?: string;
}

export class LegalContract extends Entity {
  private props: ILegalContract;

  constructor(
    props: Replace<ILegalContract, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.legal_client_id,
        fieldName: 'Legal Client',
        maxLength: 200,
      },
      {
        field: this.props.created_at,
        fieldName: 'Created At',
        maxLength: 80,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 80,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated By',
        maxLength: 80,
      },
      {
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 80,
      },
    );
    this.notification.requiredField('LegalContract', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get legal_client_id(): string {
    return this.props.legal_client_id;
  }

  set legal_client_id(legal_client_id: string) {
    this.props.legal_client_id = legal_client_id;
  }

  get carrier_company_id(): string {
    return this.props.carrier_company_id;
  }

  set carrier_company_id(carrier_company_id: string) {
    this.props.carrier_company_id = carrier_company_id;
  }

  get contract_number(): string {
    return this.props.contract_number;
  }

  set contract_number(contract_number: string) {
    this.props.contract_number = contract_number;
  }

  get observations(): string | undefined {
    return this.props.observations;
  }

  set observations(observations: string | undefined) {
    this.props.observations = observations;
  }

  get effective_date(): Date {
    return this.props.effective_date;
  }

  set effective_date(effective_date: Date) {
    this.props.effective_date = effective_date;
  }

  get delivery_conditions(): string {
    return this.props.delivery_conditions;
  }

  set delivery_conditions(delivery_conditions: string) {
    this.props.delivery_conditions = delivery_conditions;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
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
