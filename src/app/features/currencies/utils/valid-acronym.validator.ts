import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates whether the input field is an existing currency acronym.
 * @param possibleCurrencies - Acronyms of existing names.
 */
export function validAcronym(possibleCurrencies: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    if (possibleCurrencies.find((currency: any) => currency === control.value)) {
      return null;
    }

    return { invalidAcronym: true };
  }
}