import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IInfo } from '../../stores/info';

@Component({
  selector: 'rdx-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() active: string;
  @Input() info: { [clientId: string]: IInfo; } = { };

  @Output() search = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() errors = new EventEmitter<void>();
}
