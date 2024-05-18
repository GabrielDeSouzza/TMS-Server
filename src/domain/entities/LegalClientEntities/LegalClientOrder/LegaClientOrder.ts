import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IExpense {
  id?: string;
  expenseName: string;
  value: number;
}
export interface ILegalClientOrder {
  id?: string;
  order: string;
  legal_contract_id: string;
  quote_table_id: string;
  total_shipping_cost?: number;
  icms_tax?: number;
  cofins_tax?: number;
  pis_tax?: number;
  calculated_pis?: number;
  calculate_cofins?: number;
  calculate_icms?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  carrier_id: string;
  updated_at?: Date;
  created_at?: Date;
  created_by?: string;
  updated_by: string;
  expenses?: IExpense[];
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
      {
        field: this.props.carrier_id,
        fieldName: 'Carrier Company',
        maxLength: 999,
      },
      {
        field: this.props.total_receivable,
        fieldName: 'Total Receivable',
        maxLength: 999,
      },
      {
        field: this.props.total_shipping_cost,
        fieldName: 'Total Shipping Cost',
        maxLength: 999,
      },
      {
        field: this.props.total_tax_payable,
        fieldName: 'Total Tax Payable',
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
  public get expenses(): IExpense[] {
    return this.props.expenses;
  }
  public set expenses(expenses: IExpense[]) {
    this.props.expenses = expenses;
  }
  public get total_shipping_cost(): number {
    return this.props.total_shipping_cost | 0;
  }
  public set total_shipping_cost(total_shipping_cost: number) {
    this.props.total_shipping_cost = total_shipping_cost;
  }
  public get total_receivable(): number {
    return (this.total_shipping_cost + this.total_tax_payable) | 0;
  }

  public get total_tax_payable(): number {
    return (
      (this.calculate_cofins + this.calculate_icms + this.calculated_pis) | 0
    );
  }

  public set order(order: string) {
    this.props.order = order;
  }
  public get order(): string {
    return this.props.order;
  }

  public get carrier_id(): string {
    return this.props.carrier_id;
  }

  public set carrier_id(carrier_id: string) {
    this.props.carrier_id = carrier_id;
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

  public set icms_tax(icms_tax: number) {
    this.props.icms_tax = icms_tax;
  }

  public get icms_tax(): number {
    return this.props.icms_tax;
  }

  public set pis_tax(pis_tax: number) {
    this.props.pis_tax = pis_tax;
  }

  public get pis_tax(): number {
    return this.props.pis_tax;
  }
  public set cofins_tax(cofins_tax: number) {
    this.props.cofins_tax = cofins_tax;
  }

  public get cofins_tax(): number {
    return this.props.cofins_tax;
  }

  public set calculated_pis(calculated_pis: number) {
    this.props.calculated_pis = calculated_pis;
  }

  public get calculated_pis(): number {
    return this.aroundValues(this.props.calculated_pis);
  }

  public set calculate_icms(calculate_icms: number) {
    this.props.calculate_icms = calculate_icms;
  }

  public get calculate_icms(): number {
    return this.aroundValues(this.props.calculate_icms);
  }
  public set calculate_cofins(calculate_cofins: number) {
    this.props.calculate_cofins = calculate_cofins;
  }

  public get calculate_cofins(): number {
    return this.aroundValues(this.props.calculate_cofins);
  }

  private aroundValues(value: number): number {
    return Number.parseFloat(value?.toFixed(2));
  }
}
