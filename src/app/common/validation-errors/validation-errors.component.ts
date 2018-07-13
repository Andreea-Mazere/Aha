import { Component, Input} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class ValidationErrorsComponent{
  @Input()
  translationPrefix : string;
  @Input()
  control : AbstractControl;

  get shouldShow():boolean {
     return this.control.invalid && 
      (this.control.dirty || this.control.touched);
  }

  get errorTranslationKeys(): string[] {
    if (!this.control.errors) return [];
    return Object.keys(this.control.errors).map(errorKey => 
      [this.translationPrefix, this.controlName, errorKey].filter(s => s).join('_'));
  }

  private get controlName(): string | null {
    if (!this.control.parent) return null;
    const formGroup = this.control.parent.controls;
    return Object.keys(formGroup).find(name => this.control === formGroup[name]) || null;
  } 
    
}
