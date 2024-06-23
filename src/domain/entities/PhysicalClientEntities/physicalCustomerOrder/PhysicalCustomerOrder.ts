import { randomUUID } from 'node:crypto';

import { type IExpense } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { cofinsValue, pisValue } from 'domain/shared/taxes/taxes';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IPhysicalCustomerOrder {
  id?: string;
  order: string;
  physicalCustomerId: string;
  total_shipping_cost?: number;
  icms_tax?: number;
  cofins_tax?: number;
  pis_tax?: number;
  calculated_pis?: number;
  calculate_cofins?: number;
  calculate_icms?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  quote_table_id: string;
  carrier_id: string;
  updated_at?: Date;
  created_at?: Date;
  updated_by: string;
  created_by: string;
  expenses?: IExpense[];
}

export class PhysicalCustomerOrder extends Entity {
  private props: IPhysicalCustomerOrder;
  private totolExpense: number;
  constructor(
    props: Replace<
      IPhysicalCustomerOrder,
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

    this.totolExpense = props.expenses?.reduce(
      (total, expense) => total + expense.value,
      0,
    );
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
        field: this.props.physicalCustomerId,
        fieldName: 'Physical Customer Id',
        maxLength: 999,
      },
      {
        field: this.props.quote_table_id,
        fieldName: 'Recipient ',
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

    this.notification.requiredField('CustomerOrder', fieldsValidation);
  }

  get id(): string {
    return this.props.id;
  }
  public get quote_table_id(): string {
    return this.props.quote_table_id;
  }

  public set quote_table_id(quote_table_id: string) {
    this.props.quote_table_id = quote_table_id;
  }

  public get expenses(): IExpense[] {
    return this.props.expenses;
  }
  public set expenses(expenses: IExpense[]) {
    this.props.expenses = expenses;
    this.totolExpense = expenses?.reduce(
      (total, expense) => total + expense.value,
      0,
    );
  }
  get order(): string {
    return this.props.order;
  }

  set order(order: string) {
    this.props.order = order;
  }

  get physicalCustomerId(): string {
    return this.props.physicalCustomerId;
  }

  set physicalCustomerId(physicalCustomerId: string) {
    this.props.physicalCustomerId = physicalCustomerId;
  }

  public get carrier_id(): string {
    return this.props.carrier_id;
  }

  public set carrier_id(carrier_id: string) {
    this.props.carrier_id = carrier_id;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_by(): string {
    return this.props.updated_by;
  }

  set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  get created_by(): string {
    return this.props.created_by;
  }

  set created_by(created_by: string) {
    this.props.created_by = created_by;
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
    const pisTax =
      this.props.pis_tax === undefined ? pisValue : this.props.pis_tax;

    return pisTax;
  }
  public set cofins_tax(cofins_tax: number) {
    this.props.cofins_tax = cofins_tax;
  }

  public get cofins_tax(): number {
    const cofinsTax =
      this.props.cofins_tax === undefined ? cofinsValue : this.props.cofins_tax;

    return cofinsTax;
  }

  public get calculated_pis(): number {
    return this.aroundValues((this.pis_tax * this.totolExpense) / 100);
  }

  public get calculate_icms(): number {
    return this.aroundValues(this.props.icms_tax * this.totolExpense) / 100;
  }

  public get calculate_cofins(): number {
    const calculeteCofins = (this.cofins_tax / 100) * this.totolExpense;

    return this.aroundValues(calculeteCofins);
  }

  public get total_shipping_cost(): number {
    return this.totolExpense | 0;
  }

  public get total_receivable(): number {
    return this.aroundValues(this.total_shipping_cost + this.total_tax_payable);
  }

  public get total_tax_payable(): number {
    return this.aroundValues(
      this.calculate_cofins + this.calculate_icms + this.calculated_pis,
    );
  }

  private aroundValues(value: number): number {
    return Number.parseFloat(value?.toFixed(2));
  }
}
