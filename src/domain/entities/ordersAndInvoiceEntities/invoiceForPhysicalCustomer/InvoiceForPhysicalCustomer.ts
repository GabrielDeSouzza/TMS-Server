import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { type PhysicalCustomer } from '../../../entities/clientsEntities/physicalCustomer/PhysicalCustomer';
import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type CarrierCompany } from '../../legalPersonEntities/carrierCompany/CarrierCompany';
import { type CustomerOrder } from '../order/CustomerOrder';

interface IInvoicePhysicalCustomer {
  emission_date: Date;
  nature_invoice: string;
  invoice_total: number;
  form_payment: string;
  additional_data: string;
  digital_signature: string;
  invoice_taxes: string;
  CarrierCompany: CarrierCompany;
  carrier_cnpj?: string;
  PhysicalCustomer: PhysicalCustomer;
  physicalcustomer_cpf?: string;
  customerOrderId?: string;
  CustomerOrder: CustomerOrder;
  updated_at: Date;
  created_at: Date;
}

export class InvoicePhysicalCustomer extends Entity {
  private _id: string;
  private props: IInvoicePhysicalCustomer;

  constructor(
    props: Replace<
      IInvoicePhysicalCustomer,
      { created_at?: Date; updated_at?: Date }
    >,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
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
        field: this.props.carrier_cnpj,
        fieldName: 'Carrier CNPJ',
        maxLength: 14,
        minLength: 14,
        isNullAble: true,
      },
      {
        field: this.props.physicalcustomer_cpf,
        fieldName: 'CPF Physical Customer',
        maxLength: 14,
        minLength: 14,
        isNullAble: true,
      },
      {
        field: this.props.customerOrderId,
        fieldName: 'Customer Order ID',
        maxLength: 100,
        isNullAble: true,
      },
    );

    this.notification.requiredField(
      'InvoicePhysicalCustomer',
      fieldsValidation,
    );
    this.props.PhysicalCustomer.validate();
    this.props.CustomerOrder.validate();
  }

  public get id(): string {
    return this._id;
  }
  public set emission_date(emissionDate: Date) {
    this.props.emission_date = emissionDate;
  }

  public get emission_date(): Date {
    return this.props.emission_date;
  }

  public set nature_invoice(natureInvoice: string) {
    this.props.nature_invoice = natureInvoice;
  }

  public get nature_invoice(): string {
    return this.props.nature_invoice;
  }

  public set invoice_total(invoiceTotal: number) {
    this.props.invoice_total = invoiceTotal;
  }

  public get invoice_total(): number {
    return this.props.invoice_total;
  }

  public set form_payment(formPayment: string) {
    this.props.form_payment = formPayment;
  }

  public get form_payment(): string {
    return this.props.form_payment;
  }

  public set additional_data(additionalData: string | undefined) {
    this.props.additional_data = additionalData;
  }

  public get additional_data(): string | undefined {
    return this.props.additional_data;
  }

  public set digital_signature(digitalSignature: string) {
    this.props.digital_signature = digitalSignature;
  }

  public get digital_signature(): string {
    return this.props.digital_signature;
  }

  public set invoice_taxes(invoiceTaxes: string) {
    this.props.invoice_taxes = invoiceTaxes;
  }

  public get invoice_taxes(): string {
    return this.props.invoice_taxes;
  }

  public set CarrierCompany(carrierCompany: CarrierCompany) {
    this.props.CarrierCompany = carrierCompany;
  }

  public get CarrierCompany(): CarrierCompany {
    return this.props.CarrierCompany;
  }

  public set carrier_cnpj(carrierCnpj: string | undefined) {
    this.props.carrier_cnpj = carrierCnpj;
  }

  public get carrier_cnpj(): string | undefined {
    return this.props.carrier_cnpj;
  }

  public set PhysicalCustomer(physicalCustomer: PhysicalCustomer) {
    this.props.PhysicalCustomer = physicalCustomer;
  }

  public get PhysicalCustomer(): PhysicalCustomer {
    return this.props.PhysicalCustomer;
  }

  public set physicalcustomer_cpf(physicalcustomer_cpf: string) {
    this.props.physicalcustomer_cpf = physicalcustomer_cpf;
  }

  public get physicalcustomer_cpf(): string {
    return this.props.physicalcustomer_cpf;
  }

  public set customerOrderId(customerOrderId: string | undefined) {
    this.props.customerOrderId = customerOrderId;
  }

  public get customerOrderId(): string | undefined {
    return this.props.customerOrderId;
  }

  public set CustomerOrder(customerOrder: CustomerOrder) {
    this.props.CustomerOrder = customerOrder;
  }

  public get CustomerOrder(): CustomerOrder {
    return this.props.CustomerOrder;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
