import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ICiotForPhysicalCustomer {
  id?: string;
  ciot: string;
  emission_date: Date;
  physical_contract_id: string;
  carrier_company_id: string;
  updated_at: Date;
  created_at?: Date;
  created_by?: string;
  updated_by: string;
}

export class CiotForPhysicalCustomer extends Entity {
  private props: ICiotForPhysicalCustomer;

  constructor(
    props: Replace<
      ICiotForPhysicalCustomer,
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
        field: this.props.ciot,
        fieldName: 'CIOT',
        maxLength: 20,
      },
      {
        field: this.props.emission_date,
        fieldName: 'Emission Date',
        maxLength: 20,
      },
      {
        field: this.props.physical_contract_id,
        fieldName: 'Physical Contract',
        maxLength: 200,
      },
      {
        field: this.props.carrier_company_id,
        fieldName: 'Carrier Company',
        maxLength: 200,
      },
      {
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 200,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated By',
        maxLength: 200,
      },
      {
        field: this.props.created_at,
        fieldName: 'Created At',
        maxLength: 200,
      },
      {
        field: this.props.updated_at,
        fieldName: 'Updated At',
        maxLength: 200,
      },
    );
    this.notification.requiredField(
      'CiotForPhysicalCustomer',
      fieldsValidation,
    );
  }
  get id(): string {
    return this.props.id;
  }

  get ciot(): string {
    return this.props.ciot;
  }

  set ciot(ciot: string) {
    this.props.ciot = ciot;
  }

  get emission_date(): Date {
    return this.props.emission_date;
  }

  set emission_date(emission_date: Date) {
    this.props.emission_date = emission_date;
  }

  get physical_contract_id(): string {
    return this.props.physical_contract_id;
  }

  set physical_contract_id(physical_contract_id: string) {
    this.props.physical_contract_id = physical_contract_id;
  }

  get carrier_company_id(): string {
    return this.props.carrier_company_id;
  }

  set carrier_company_id(carrier_company_id: string) {
    this.props.carrier_company_id = carrier_company_id;
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

  get created_by(): string {
    return this.props.created_by;
  }

  set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  get updated_by(): string {
    return this.props.updated_by;
  }

  set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }
}
