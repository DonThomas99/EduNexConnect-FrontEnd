import { FormBuilder,type AbstractControl, type ValidationErrors, type ValidatorFn } from "@angular/forms";

const formBuilder = new FormBuilder()

export function validateBytrimming(validators:ValidatorFn[]):ValidatorFn{
    return (control:AbstractControl)=>{
        const trimmedValue = control.value.trim()

        //create a new control with same trimmed value 
        const trimmedControl = formBuilder.control(trimmedValue)
        
        //Apply the provided validators to the trimmed value
        return validators.reduce<ValidationErrors | null>((error: ValidationErrors | null, validator) => error ?? validator(trimmedControl),null)
        
    }
}