import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IVehicle {
  id?: string;
  plate: string;
  year: string;
  color: string;
  renavam: string;
  antt: string;
  model_id: string;
}

export class Vehicle extends Entity {
  private props: IVehicle | Partial<IVehicle>;

  constructor(
    props: Replace<
      IVehicle | Partial<IVehicle>,
      { created_at?: Date; updated_at?: Date }
    >,
  ) {
    super();

    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
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
        field: this.props.plate,
        fieldName: 'Plate',
        maxLength: 8,
        minLength: 6,
      },
      { field: this.props.color, fieldName: 'Color', maxLength: 20 },
      { field: this.props.renavam, fieldName: 'Renavam', maxLength: 11 },
      {
        field: this.props.antt,
        fieldName: 'ANTT',
        maxLength: 4,
      },
      { field: this.props.year, fieldName: 'Year', maxLength: 4 },
    );
    this.notification.requiredField('vehicle', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public get model_id(): string {
    return this.props.model_id;
  }
  public set model_id(model_id: string) {
    this.props.model_id = model_id;
  }

  public set plate(plate: string) {
    this.props.plate = plate;
  }

  public get plate(): string {
    return this.props.plate;
  }

  public set year(year: string) {
    this.props.year = year;
  }

  public get year(): string {
    return this.props.year;
  }

  public set color(color: string) {
    this.props.color = color;
  }

  public get color(): string {
    return this.props.color;
  }

  public set renavam(renavam: string) {
    this.props.renavam = renavam;
  }

  public get renavam(): string {
    return this.props.renavam;
  }

  public set antt(antt: string) {
    this.props.antt = antt;
  }

  public get antt(): string {
    return this.props.antt;
  }
}
