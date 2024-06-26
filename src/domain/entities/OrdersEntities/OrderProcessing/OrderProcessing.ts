import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IOrderProcessing {
  id?: string;
  total_distance: number;
  order_processing_number: string;
  legal_customer_order_ids?: string[];
  physical_customer_order_ids?: string[];
  disconnect_legal_order?: string[];
  disconnect_physical_customer_order?: string[];
  total_spend_liters: number;
  total_spending_money: number;
  status: string;
  start_at: Date;
  end_at?: Date;
  vehicle_id: string;
  driver_id: string;
  updated_at?: Date;
  created_at?: Date;
  created_by: string;
  updated_by: string;
}

export class OrderProcessing extends Entity {
  private props: IOrderProcessing;

  constructor(
    props: Replace<IOrderProcessing, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.total_distance,
        fieldName: 'Total Distance',
        maxLength: 20,
      },
      {
        field: this.total_spend_liters,
        fieldName: 'Total Spend Liters',
        maxLength: 20,
      },
      {
        field: this.total_spending_money,
        fieldName: 'Total Spending Money',
        maxLength: 20,
      },
      {
        field: this.start_at,
        fieldName: 'Start Date',
        maxLength: 20,
      },
      {
        field: this.props.vehicle_id,
        fieldName: 'Vehicle',
        maxLength: 1000,
        isNullAble: true,
      },

      {
        field: this.props.end_at,
        fieldName: 'End Date',
        maxLength: 20,
        isNullAble: true,
      },
    );

    this.notification.requiredField(
      'OrderProcessingLegalClient',
      fieldsValidation,
    );
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get total_distance(): number {
    return this.props.total_distance;
  }

  set total_distance(total_distance: number) {
    this.props.total_distance = total_distance;
  }

  get total_spend_liters(): number {
    return this.props.total_spend_liters;
  }

  set total_spend_liters(total_spend_liters: number) {
    this.props.total_spend_liters = total_spend_liters;
  }

  get total_spending_money(): number {
    return this.props.total_spending_money;
  }

  set total_spending_money(total_spending_money: number) {
    this.props.total_spending_money = total_spending_money;
  }

  get start_at(): Date {
    return this.props.start_at;
  }

  set start_at(start_at: Date) {
    this.props.start_at = start_at;
  }

  get end_at(): Date | undefined {
    return this.props.end_at;
  }

  set end_at(end_at: Date | undefined) {
    this.props.end_at = end_at;
  }

  get status(): string {
    return this.props.status;
  }

  set status(status: string) {
    this.props.status = status;
  }

  get driver_id(): string {
    return this.props.driver_id;
  }

  set driver_id(driver_id: string) {
    this.props.driver_id = driver_id;
  }

  get vehicle_id(): string {
    return this.props.vehicle_id;
  }

  set vehicle_id(vehicle_id: string) {
    this.props.vehicle_id = vehicle_id;
  }

  get order_processing_number(): string {
    return this.props.order_processing_number;
  }

  set order_procorder_processing_numberessing(order_processing_number: string) {
    this.props.order_processing_number = order_processing_number;
  }

  get legal_customer_order_ids(): string[] {
    return this.props.legal_customer_order_ids;
  }

  set legal_customer_order_ids(legal_customer_order_ids: string[]) {
    this.props.legal_customer_order_ids = legal_customer_order_ids;
  }

  get disconnect_legal_order(): string[] {
    return this.props.disconnect_legal_order;
  }

  set disconnect_legal_order(disconnect_legal_order: string[]) {
    this.props.disconnect_legal_order = disconnect_legal_order;
  }

  get physical_customer_order_ids(): string[] {
    return this.props.physical_customer_order_ids;
  }

  set physical_customer_order_ids(physical_customer_order_ids: string[]) {
    this.props.physical_customer_order_ids = physical_customer_order_ids;
  }

  get disconnect_physical_customer_order(): string[] {
    return this.props.disconnect_physical_customer_order;
  }

  set disconnect_physical_customer_order(
    disconnect_physical_customer_order: string[],
  ) {
    this.props.disconnect_physical_customer_order =
      disconnect_physical_customer_order;
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
