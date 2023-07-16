/* eslint-disable unicorn/no-array-for-each */
export interface INotificationError {
  message: string;
  context: string;
}

export interface IValidationField {
  field: string | number | boolean | Date;
  fieldName: string;
  maxLength: number;
  minLength?: number;
  isNullAble?: boolean;
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
      if (!fieldValidation.isNullAble && !fieldValidation.field) {
        this.errors.push({
          context,
          message: `${fieldValidation.fieldName} can't be null`,
        });
      }

      if (typeof fieldValidation.field === 'string')
        this.requiredFieldIsString(context, fieldValidation);
      else if (typeof fieldValidation.field === 'number')
        this.requiredFieldIsNumber(context, fieldValidation);
      else if (typeof fieldValidation.field === 'boolean')
        this.requiredFieldIsBoolean(context, fieldValidation);
      else if (fieldValidation.field instanceof Date)
        this.requiredFielIsDate(context, fieldValidation);
    });
  }
  private requiredFielIsDate(
    context: string,
    fieldValidation: IValidationField,
  ) {
    fieldValidation.field = fieldValidation.field as Date;

    if (Number.isNaN(fieldValidation.field.getDate())) {
      this.errors.push({
        context,
        message: fieldValidation.fieldName + ' is invalid',
      });
    }
  }

  private requiredFieldIsBoolean(
    context: string,
    fieldValidation: IValidationField,
  ) {
    fieldValidation.field = fieldValidation.field as boolean;

    if (fieldValidation.field !== false && fieldValidation.field !== true) {
      this.errors.push({
        context,
        message: fieldValidation.fieldName + ' is required',
      });
    }
  }
  private requiredFieldIsNumber(
    context: string,
    fieldValidation: IValidationField,
  ) {
    fieldValidation.minLength ?? fieldValidation.maxLength;
    fieldValidation.field = fieldValidation.field as number;

    if (fieldValidation.field > fieldValidation.maxLength) {
      this.errors.push({
        context,
        message: fieldValidation.fieldName + ' exceeded the number limit',
      });

      return;
    } else if (fieldValidation.field < fieldValidation.minLength) {
      this.errors.push({
        context,
        message:
          fieldValidation.fieldName +
          ' does not have the minimum number accepted',
      });
    }

    return;
  }
  private requiredFieldIsString(
    context: string,
    fieldValidation: IValidationField,
  ) {
    fieldValidation.minLength ?? fieldValidation.maxLength;
    fieldValidation.field = fieldValidation.field as string;
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
  }
}
