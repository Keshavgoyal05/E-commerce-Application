import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static checkPassword(password: string): ValidatorFn {
    return (controls: AbstractControl) => {
      var control = controls.get(password);
      var strongRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
      
      if (control?.errors && !control.errors['check']) {
        return null;
      }
      console.log("strongregex : " +strongRegex + " password : " +control?.value +" : result :" + strongRegex.test(password));
      if(!strongRegex.test(control?.value)){
        controls.get(password)?.setErrors({
        check: true
        });
      return { check: true };
      }
      else{
        console.log("strongregex" +strongRegex + " : success");
        return null;  
      }

    };
  }

  static matchPassword(password: string, confirmPassword : string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(password);
      const checkControl = controls.get(confirmPassword);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(confirmPassword)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}