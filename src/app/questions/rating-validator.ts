import { AbstractControl } from '@angular/forms';

export class RatingValidator {
  static isRated( control:AbstractControl ){
    /*if (RatingValidator.isEmptyValue(control.value)) {
         return null;
    }*/
    if (control.value <= 0){
      return {
         "notRated" : true
      };
    }else{
      return {
         "notRated" : false
      };
    }
  }
} 
