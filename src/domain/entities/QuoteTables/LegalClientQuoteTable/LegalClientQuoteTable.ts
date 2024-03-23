import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface ILegalClientQuoteTable {
  id?: string;
  codQuote: string;
  recipientId: string;
  senderId: string;
  who_pays: string;
  postalCodOrigin: string;
  postalCodDestiny: string;
  typeMerchandise: string;
  amount: number;
  description: string;
  mass: number;
  volume: number;
  nf_value: number;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  updated_by: string;
}

export class LegalClientQuoteTable extends Entity {
  private props: ILegalClientQuoteTable;

  constructor(
    props: Replace<
      ILegalClientQuoteTable,
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
        maxLength: 1000,
      },
      {
        field: this.props.description,
        fieldName: 'Description',
        maxLength: 100,
      },
      {
        field: this.props.mass,
        fieldName: 'Mass',
        maxLength: 6,
      },
      {
        field: this.props.nf_value,
        fieldName: 'Nf Value',
        maxLength: 8,
      },
      {
        field: this.props.postalCodDestiny,
        fieldName: 'Postal Cod Destiny',
        maxLength: 9,
      },
      {
        field: this.props.postalCodOrigin,
        fieldName: 'Postal Cod Origin',
        maxLength: 9,
      },
      {
        field: this.props.recipientId,
        fieldName: 'Recipient',
        maxLength: 1000,
      },
      {
        field: this.props.senderId,
        fieldName: 'Sender',
        maxLength: 1000,
      },
      {
        field: this.props.typeMerchandise,
        fieldName: 'Type Merchandise',
        maxLength: 30,
      },
      {
        field: this.props.volume,
        fieldName: 'Volume',
        maxLength: 9,
      },
      {
        field: this.props.who_pays,
        fieldName: 'Who is Play',
        maxLength: 3,
      },
    );
    this.notification.requiredField('LegalClientQuoteTable', fieldsValidation);
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get codQuote(): string {
    return this.props.codQuote;
  }

  set codQuote(codQuote: string) {
    this.props.codQuote = codQuote;
  }
  get recipientId(): string {
    return this.props.recipientId;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get senderId(): string {
    return this.props.senderId;
  }

  set senderId(senderId: string) {
    this.props.senderId = senderId;
  }

  get who_pays(): string {
    return this.props.who_pays;
  }

  set who_pays(who_pays: string) {
    this.props.who_pays = who_pays;
  }

  get postalCodOrigin(): string {
    return this.props.postalCodOrigin;
  }

  set postalCodOrigin(postalCodOrigin: string) {
    this.props.postalCodOrigin = postalCodOrigin;
  }

  get postalCodDestiny(): string {
    return this.props.postalCodDestiny;
  }

  set postalCodDestiny(postalCodDestiny: string) {
    this.props.postalCodDestiny = postalCodDestiny;
  }

  get typeMerchandise(): string {
    return this.props.typeMerchandise;
  }

  set typeMerchandise(typeMerchandise: string) {
    this.props.typeMerchandise = typeMerchandise;
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

  get nf_value(): number {
    return this.props.nf_value;
  }

  set nf_value(nf_value: number) {
    this.props.nf_value = nf_value;
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
