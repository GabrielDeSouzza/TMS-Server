import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ICiotForLegalClient {
  id?: string;
  ciot: string;
  emission_date: Date;
  legal_contract_id: string;
  updated_at: Date;
  created_at: Date;
  updated_by: string;
  created_by?: string;
}

export class CiotForLegalClient extends Entity {
  private props: ICiotForLegalClient;

  constructor(
    props: Replace<
      ICiotForLegalClient,
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
    );
    this.notification.requiredField('CiotForLegalPerson', fieldsValidation);
  }
  get id(): string | undefined {
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

  get legal_contract_id(): string {
    return this.props.legal_contract_id;
  }

  set legal_contract_id(legal_contract_id: string) {
    this.props.legal_contract_id = legal_contract_id;
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
