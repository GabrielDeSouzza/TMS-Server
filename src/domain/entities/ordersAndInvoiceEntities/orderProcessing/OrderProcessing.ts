import { randomUUID } from 'node:crypto';

import { type Route } from 'domain/entities/routeEntities/Route/Route';
import { type Vehicle } from 'domain/entities/vehicleEntities/vehicle/Vehicle';
import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface IOrderProcessing {
  total_distance: number;
  total_spend_liters: number;
  total_spending_money: number;
  start_at: Date;
  end_at?: Date;
  Route: Route;
  route_id?: string;
  Vehicle: Vehicle;
  plate?: string;
  updated_at: Date;
  created_at: Date;
}

export class OrderProcessing extends Entity {
  private _id: string;
  private props: IOrderProcessing;

  constructor(
    props: Replace<IOrderProcessing, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.plate,
        fieldName: 'Plate',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.route_id,
        fieldName: 'Route ID',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.end_at,
        fieldName: 'End Date',
        maxLength: 20,
        isNullAble: true,
      },
    );

    this.notification.requiredField('OrderProcessing', fieldsValidation);
    this.props.Route.validate();
    this.props.Vehicle.validate();
  }

  public set total_distance(totalDistance: number) {
    this.props.total_distance = totalDistance;
  }

  public get total_distance(): number {
    return this.props.total_distance;
  }

  public set total_spend_liters(totalSpendLiters: number) {
    this.props.total_spend_liters = totalSpendLiters;
  }

  public get total_spend_liters(): number {
    return this.props.total_spend_liters;
  }

  public set total_spending_money(totalSpendingMoney: number) {
    this.props.total_spending_money = totalSpendingMoney;
  }

  public get total_spending_money(): number {
    return this.props.total_spending_money;
  }

  public set start_at(startDate: Date) {
    this.props.start_at = startDate;
  }

  public get start_at(): Date {
    return this.props.start_at;
  }

  public set end_at(endDate: Date | undefined) {
    this.props.end_at = endDate;
  }

  public get end_at(): Date | undefined {
    return this.props.end_at;
  }

  public set Route(route: Route) {
    this.props.Route = route;
  }

  public get Route(): Route {
    return this.props.Route;
  }

  public set route_id(routeId: string | undefined) {
    this.props.route_id = routeId;
  }

  public get route_id(): string | undefined {
    return this.props.route_id;
  }

  public set Vehicle(vehicle: Vehicle) {
    this.props.Vehicle = vehicle;
  }

  public get Vehicle(): Vehicle {
    return this.props.Vehicle;
  }

  public set plate(plate: string | undefined) {
    this.props.plate = plate;
  }

  public get plate(): string | undefined {
    return this.props.plate;
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
