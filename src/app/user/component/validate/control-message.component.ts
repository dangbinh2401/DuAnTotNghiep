import { Component, Input } from '@angular/core';
import { ValidateService } from './validate.service';


@Component({
  selector: 'control-message',
  template: `<div style="font-size: 10px; font-style: italic; float: right; color:red" *ngIf="error !== null">{{error}}</div>`
})
export class ControlMessageComponent {
  @Input() control: any;
  @Input() field!: string;
  constructor() { }

  get error() {
    for (let name in this.control.errors) {
      if (this.control.errors.hasOwnProperty(name) && (this.control.dirty || this.control.touched)) {
        return ValidateService.getValidatorErrorMessage(this.field, name, this.control.errors[name]);
      }
    }
    return null;
  }
}