export interface INotificationError {
  message: string;
  context: string;
}

export class Notification {
  private errors: INotificationError[] = [];

  getErrors(): INotificationError[] {
    return this.errors;
  }

  addError(error: INotificationError) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  messages(context?: string): string {
    return this.errors
      .filter(error => error.context === context || context === undefined)
      .map(error => `${error.context}: ${error.message}`)
      .join(', ');
  }
}
