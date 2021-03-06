import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ClientsService, IClient } from '../../stores/clients';

import { ClientDialogService } from '../../components/client-dialog';
import { ConfirmDialogService } from '../../components/confirm-dialog';

import { RouterService } from '../../router';
import { AppService } from '../../app.service';

@Component({
  selector: 'rdx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(
    readonly appService: AppService,
    readonly clientsService: ClientsService,
    readonly router: RouterService,
    private readonly _clientDialogService: ClientDialogService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) { }

  create() {
    this._clientDialogService.open().then(v => {
      if (v) {
        this.clientsService.create(v);
      }
    });
  }

  edit(e: IClient) {
    this._clientDialogService.open(e).then(v => {
      if (v) {
        this.clientsService.update({
          ...e,
          ...v,
        });
      }
    });
  }

  remove(id: string) {
    this._confirmDialogService.open('are you sure you want to delete this connection profile?').then(v => {
      if (v) {
        this.clientsService.remove({ id });
      }
    });
  }

  connect(e: IClient) {
    this.clientsService.connect(e);
  }

  disconnect(id: string) {
    this.clientsService.close({ id });
  }
}
