/* eslint-disable unicorn/no-array-for-each */
export interface INotificationError {
  message: string;
  context: string;
}

export interface IValidationField {
  field: string;
  fieldName: string;
  maxLength: number;
  minLength?: number;
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

  requiredField(context: string, fieldsValidation: Array<IValidationField>) {
    fieldsValidation.forEach(fieldValidation => {
      fieldValidation.minLength ?? fieldValidation.maxLength;

      if (fieldValidation.field.length === 0) {
        this.errors.push({
          context,
          message: fieldValidation.fieldName + ' is required',
        });

        return;
      } else if (fieldValidation.field.length > fieldValidation.maxLength) {
        this.errors.push({
          context,
          message: fieldValidation.fieldName + ' exceeded the character limit',
        });

        return;
      } else if (fieldValidation.field.length < fieldValidation.minLength) {
        this.errors.push({
          context,
          message:
            fieldValidation.fieldName +
            ' does not have the minimum number of characters accepted',
        });
      }

      return;
    });
  }
}
