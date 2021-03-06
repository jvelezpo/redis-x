import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '../../common/forms';
import { IconModule } from '../../common/icon';
import { ButtonModule } from '../../common/button';

import { NumberValidatorModule } from '../../validators/number';

import { ClientDialogComponent } from './client-dialog.component';

@NgModule({
  declarations: [ClientDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModalModule,
    NgbTooltipModule,

    FormsModule,
    IconModule,
    ButtonModule,

    NumberValidatorModule,
  ],
})
export class ClientDialogModule { }
