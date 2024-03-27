import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

export interface ILegalClientCte {
  id?: string;
  orderId: string;
  acessKey: string;
  observations?: string;
  cteNumber: string;
  cteType: string;
}

export class LegalClientCte extends Entity {
  private props: ILegalClientCte;

  constructor(props: ILegalClientCte) {
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
        field: this.props.acessKey,
        fieldName: 'Acess Key',
        maxLength: 50,
      },
      {
        field: this.props.cteNumber,
        maxLength: 12,
        minLength: 9,
        fieldName: 'CTE Number',
      },
      {
        field: this.props.observations,
        maxLength: 80,
        fieldName: 'Observations',
      },
      {
        field: this.props.orderId,
        maxLength: 1000,
        fieldName: 'Order',
      },
      {
        field: this.props.cteType,
        maxLength: 50,
        fieldName: 'CTE TYPE',
      },
    );
    this.notification.requiredField('Physical Customer Cte', fieldsValidation);
  }
  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public get orderId(): string {
    return this.props.orderId;
  }
  public set orderId(orderId: string) {
    this.props.orderId = orderId;
  }
  public get acessKey(): string {
    return this.props.acessKey;
  }
  public set acessKey(acessKey: string) {
    this.props.acessKey = acessKey;
  }
  public get observations(): string {
    return this.props.observations;
  }
  public set observations(observations: string) {
    this.props.observations = observations;
  }
  public get cteNumber(): string {
    return this.props.cteNumber;
  }
  public set cteNumber(cteNumber: string) {
    this.props.cteNumber = cteNumber;
  }
  public get cteType(): string {
    return this.props.cteType;
  }
  public set cteType(cteType: string) {
    this.props.cteType = cteType;
  }
}
