import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGroupComponent } from './form-group.component';
import { FormControlComponent } from './form-control.component';
import { LabelComponent } from './label.component';
import { ErrorComponent } from './error.component';

import { SubmitDirective } from './submit.directive';
import { AutofocusDirective } from './autofocus.directive';

const declarations = [
  FormGroupComponent,
  FormControlComponent,
  LabelComponent,
  ErrorComponent,

  SubmitDirective,
  AutofocusDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class FormsModule { }