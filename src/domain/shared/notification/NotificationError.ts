import { GraphQLError } from 'graphql';

import { type INotificationError } from './Notification';
export class NotificationError extends GraphQLError {
  constructor(public errors: INotificationError[]) {
    super(errors.map(error => `${error.context}: ${error.message}`).join(', '));
  }
}
