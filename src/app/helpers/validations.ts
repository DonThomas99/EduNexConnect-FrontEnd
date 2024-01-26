import { FormBuilder,type AbstractControl, type ValidationErrors, type ValidatorFn } from "@angular/forms";
import { repeat } from "rxjs";

const formBuilder = new FormBuilder();

export function validateBytrimming(validators:ValidatorFn[]):ValidatorFn{
    return (control:AbstractControl)=>{
        const trimmedValue = control.value.trim()

        //create a new control with same trimmed value 
        const trimmedControl = formBuilder.control(trimmedValue)
        
        //Apply the provided validators to the trimmed value
        return validators.reduce<ValidationErrors | null>((error: ValidationErrors | null, validator) => error ?? validator(trimmedControl),null)
        
    }
}

export const passwordMatchValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const cpassword = control.get('confirmPassword')
    if(password != null && cpassword != null){
        if(cpassword.value === ''){
            cpassword.setErrors({ required: true})
            return {required:true}
        }
        if(password.value != cpassword.value){
            cpassword.setErrors({passwordMismatch:true})
            return {passwordMismatch:true}
        }
    }
    cpassword?.setErrors(null)
    return null

}

