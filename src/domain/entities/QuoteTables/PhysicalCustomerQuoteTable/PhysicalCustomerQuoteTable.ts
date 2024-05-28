import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type AdressesType } from '../AdressesType';

export interface IPhysicalCustomerQuoteTable {
  id?: string;
  codQuote: string;
  kindService: string;
  formPayment: string;
  recipientId: string;
  senderId: string;
  who_pays: string;
  adressDestiny: AdressesType;
  adressOrigin: AdressesType;
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
  icms_id?: string;
  nf_serie: string;
  nf_number: string;
  digital_signature: string;
}

export class PhysicalCustomerQuoteTable extends Entity {
  private props: IPhysicalCustomerQuoteTable;

  constructor(
    props: Replace<
      IPhysicalCustomerQuoteTable,
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
        field: this.props.adressDestiny.postalCod,
        fieldName: 'Adress Destiny',
        maxLength: 9,
      },
      {
        field: this.props.adressOrigin.postalCod,
        fieldName: 'Adress Origin',
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
        maxLength: 20,
      },
    );
    this.notification.requiredField(
      'PhysicalCustomerQuoteTable',
      fieldsValidation,
    );
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
  get kindService(): string {
    return this.props.kindService;
  }

  set kindService(value: string) {
    this.props.kindService = value;
  }

  get formPayment(): string {
    return this.props.formPayment;
  }

  set formPayment(value: string) {
    this.props.formPayment = value;
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

  get adressDestiny(): AdressesType {
    return this.props.adressDestiny;
  }

  set adressDestiny(adressDestiny: AdressesType) {
    this.props.adressDestiny = adressDestiny;
  }

  get adressOrigin(): AdressesType {
    return this.props.adressOrigin;
  }

  set adressOrigin(adressOrigin: AdressesType) {
    this.props.adressOrigin = adressOrigin;
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

  get nf_serie(): string {
    return this.props.nf_serie;
  }

  set nf_serie(nf_serie: string) {
    this.props.nf_serie = nf_serie;
  }

  get nf_number(): string {
    return this.props.nf_number;
  }

  set nf_number(nf_number: string) {
    this.props.nf_number = nf_number;
  }

  get digital_signature(): string {
    return this.props.digital_signature;
  }

  set digital_signature(digital_signature: string) {
    this.props.digital_signature = digital_signature;
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

  get icms_id(): string {
    return this.props.icms_id;
  }

  set icms_id(icms_id: string) {
    this.props.icms_id = icms_id;
  }
}
