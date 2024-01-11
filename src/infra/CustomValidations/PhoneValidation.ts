import { type ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'phoneNumber', async: false })
export class ValidationPhone implements ValidatorConstraintInterface {
  validate(phone: string): boolean | Promise<boolean> {
    //+1 555-555-5555
    const internationalRegex = /^\+\d{1,4}\s?\d+-\d+-\d+$/;
    //(555) 555-5555
    const nationalRegex = /^\(?\d{3}\)?\s?\d{3}-\d{4}$/;
    //(99) 91234-5678
    const brazilianCellPhoneRegex = /^\(?\d{2}\)?\s?9\d{4}-\d{4}$/;

    if (
      internationalRegex.test(phone) ||
      nationalRegex.test(phone) ||
      brazilianCellPhoneRegex.test(phone) ||
      !phone
    )
      return true;

    return false;
  }
  defaultMessage?(): string {
    return 'Phone Number is Invalid!';
  }
}
