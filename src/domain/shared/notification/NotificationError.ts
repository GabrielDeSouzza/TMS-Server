import { type INotificationError } from './Notification';

export class NotificationError extends Error {
  constructor(public errors: INotificationError[]) {
    super(errors.map(error => `${error.context}: ${error.message}`).join(', '));
  }
}
