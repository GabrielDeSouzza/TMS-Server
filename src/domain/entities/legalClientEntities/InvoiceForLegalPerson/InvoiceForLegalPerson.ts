import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface IInvoiceForLegalPerson {
  id?: string;
  emission_date: Date;
  nature_invoice: string;
  invoice_total: number;
  form_payment: string;
  additional_data: string;
  digital_signature: string;
  invoice_taxes: string;
  legal_client_order_id: string;
  carrier_company_id: string;
  updated_at: Date;
  created_at: Date;
}

export class InvoiceForLegalPerson extends Entity {
  private props: IInvoiceForLegalPerson;

  constructor(
    props: Replace<
      IInvoiceForLegalPerson,
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
        field: this.props.emission_date,
        fieldName: 'Emission Date',
        maxLength: 20,
      },
      {
        field: this.props.nature_invoice,
        fieldName: 'Nature Invoice',
        maxLength: 100,
      },
      {
        field: this.props.invoice_total,
        fieldName: 'Invoice Total',
        maxLength: 20,
      },
      {
        field: this.props.form_payment,
        fieldName: 'Form Payment',
        maxLength: 50,
      },
      {
        field: this.props.additional_data,
        fieldName: 'Additional Data',
        maxLength: 80,
      },
      {
        field: this.props.digital_signature,
        fieldName: 'Digital Signature',
        maxLength: 80,
      },
      {
        field: this.props.invoice_taxes,
        fieldName: 'Invoice Taxes',
        maxLength: 20,
      },
      {
        field: this.props.legal_client_order_id,
        fieldName: 'Legal Client Order',
        maxLength: 999,
      },
      {
        field: this.props.carrier_company_id,
        fieldName: 'Carrier Company',
        maxLength: 999,
      },
    );

    this.notification.requiredField('TypeOfMaintenance', fieldsValidation);
  }
  get id(): string | undefined {
    return this.props.id;
  }

  set id(id: string | undefined) {
    this.props.id = id;
  }

  get emission_date(): Date {
    return this.props.emission_date;
  }

  set emission_date(emission_date: Date) {
    this.props.emission_date = emission_date;
  }

  get nature_invoice(): string {
    return this.props.nature_invoice;
  }

  set nature_invoice(nature_invoice: string) {
    this.props.nature_invoice = nature_invoice;
  }

  get invoice_total(): number {
    return this.props.invoice_total;
  }

  set invoice_total(invoice_total: number) {
    this.props.invoice_total = invoice_total;
  }

  get form_payment(): string {
    return this.props.form_payment;
  }

  set form_payment(form_payment: string) {
    this.props.form_payment = form_payment;
  }

  get additional_data(): string {
    return this.props.additional_data;
  }

  set additional_data(additional_data: string) {
    this.props.additional_data = additional_data;
  }

  get digital_signature(): string {
    return this.props.digital_signature;
  }

  set digital_signature(digital_signature: string) {
    this.props.digital_signature = digital_signature;
  }

  get invoice_taxes(): string {
    return this.props.invoice_taxes;
  }

  set invoice_taxes(invoice_taxes: string) {
    this.props.invoice_taxes = invoice_taxes;
  }

  get legalClientOrderId(): string {
    return this.props.legal_client_order_id;
  }

  set legalClientOrderId(legal_client_order_id: string) {
    this.props.legal_client_order_id = legal_client_order_id;
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
}
