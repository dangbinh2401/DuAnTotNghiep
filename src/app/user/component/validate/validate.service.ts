export class ValidateService {
    static getValidatorErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        let config: { [key: string]: string } = {
            'required': `${fieldName} is invalid`,
            'minlength': `${fieldName} not less than ${validatorValue.requiredLength} characters`,
            'maxlength': `${fieldName} not more than ${validatorValue.requiredLength} characters`,
            'min': `${fieldName} not less than ${validatorValue.requiredMin}`,
            'max': `${fieldName} not more than ${validatorValue.requiredMax}`,
            'pattern': `${fieldName} is malformed`

        };
        const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
            obj[key];
        return getKeyValue(config)(validatorName);
    }
}