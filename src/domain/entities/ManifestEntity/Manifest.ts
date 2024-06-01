import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

export interface IManifest {
  id?: string;
  order_processing_id: string;
  manifest_url?: string;
  emission_date: Date;
  number: string;
  serie: string;
  num_protocol: string;
  acess_key: string;
}

export class Manifest extends Entity {
  private props: IManifest;

  constructor(props: IManifest) {
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
        field: this.props.acess_key,
        fieldName: 'Acess Key',
        maxLength: 100,
      },
      {
        field: this.props.emission_date,
        fieldName: 'Emission Dae',
        maxLength: 20,
      },
      {
        field: this.props.num_protocol,
        fieldName: 'Num Protocol',
        maxLength: 20,
        isNullAble: true,
      },
      {
        field: this.props.number,
        fieldName: 'Number',
        maxLength: 40,
      },
      {
        field: this.props.order_processing_id,
        fieldName: 'Order Processing Id',
        maxLength: 100,
      },
      {
        field: this.props.serie,
        fieldName: 'Serie',
        maxLength: 40,
      },
    );

    this.notification.requiredField('Manifest', fieldsValidation);
  }

  get id(): string | undefined {
    return this.props.id;
  }
  set id(id: string) {
    this.props.id = id;
  }
  get acess_key(): string {
    return this.props.acess_key;
  }

  set description(acess_key: string) {
    this.props.acess_key = acess_key;
  }
  get emission_date(): Date {
    return this.props.emission_date;
  }

  set emission_date(emission_date: Date) {
    this.props.emission_date = emission_date;
  }

  get manifest_url(): string {
    return this.props.manifest_url;
  }

  set manifest_url(manifest_url: string) {
    this.props.manifest_url = manifest_url;
  }

  get num_protocol(): string {
    return this.props.num_protocol;
  }

  set num_protocol(numberProtocol: string) {
    this.props.num_protocol = numberProtocol;
  }

  get number(): string {
    return this.props.number;
  }

  set number(number: string) {
    this.props.number = number;
  }

  get order_processing_id(): string {
    return this.props.order_processing_id;
  }

  set order_processing_id(order_processing_id: string) {
    this.props.order_processing_id = order_processing_id;
  }

  get serie(): string {
    return this.props.serie;
  }

  set serie(serie: string) {
    this.props.serie = serie;
  }
}
