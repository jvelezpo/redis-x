import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { IJsonTreeNode } from './json-tree-node.interface';
import { parseJsonTreeNodes } from './parse-json-tree-nodes.util';
import { IJsonTreeNodeExpanded } from './json-tree-node-expanded.interface';
import { JsonTreeNodeAction } from './json-tree-node-action.type';
import { IJsonTreeNodeActionClickEvent } from './json-tree-node-action-click-event.interface';

@Component({
  selector: 'rdx-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss'],
  host: {
    class: 'rdx-json-tree',
    '[class.rdx-json-tree--root]': '!child',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonTreeComponent implements OnInit {
  @Input() path: string[] = [];

  @Input()
  get filter() { return this._filter; }
  set filter(v) {
    this._filter = v;
    this._nodes = this.json !== undefined ? parseJsonTreeNodes(this.path, this.json, v) : [];
    this._generateState();
    this._cdr.markForCheck();
  }
  private _filter?: string;

  @Input()
  get child() { return this._child; }
  set child(v) {
    this._child = coerceBooleanProperty(v);
  }
  private _child?: boolean;

  @Input()
  get json() { return this._json; }
  set json(v: any) {
    this._json = v;
    this._nodes = v !== undefined ? parseJsonTreeNodes(this.path, v, this.filter) : [];
    this._generateState();
    this._cdr.markForCheck();
  }
  private _json?: any;

  @Input()
  get expanded() { return this._expanded; }
  set expanded(v: boolean) {
    this._expanded = coerceBooleanProperty(v);
    this._cdr.markForCheck();
  }
  private _expanded?: boolean;

  @Input()
  get state() { return this._state; }
  set state(v) {
    this._state = v;
    this._cdr.markForCheck();
  }
  private _state: { [key: string]: IJsonTreeNodeExpanded } = { };

  @Output() propertyValueClick = new EventEmitter<IJsonTreeNode>();
  @Output() propertyLoadClick = new EventEmitter<IJsonTreeNode>();
  @Output() propertyActionClick = new EventEmitter<IJsonTreeNodeActionClickEvent>();

  get nodes() { return this._nodes; }
  private _nodes: IJsonTreeNode[] = [];

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this._json !== undefined && !this.nodes.length) {
      this._nodes = parseJsonTreeNodes(this.path, this._json, this.filter);
    }

    this._generateState();
  }

  toggle(e: Event, node: IJsonTreeNode) {
    if (node.expandable) {
      e.stopImmediatePropagation();
      e.preventDefault();
      this.state[node.key].expanded = !this.state[node.key].expanded;
    }
  }

  onPropertyValueClick(node: IJsonTreeNode) {
    if (node.value === undefined) {
      this.propertyLoadClick.emit(node);
    } else {
      this.propertyValueClick.emit(node);
    }
  }

  onActionToggleClick(e: Event, popover: NgbPopover) {
    e.stopImmediatePropagation();
    e.preventDefault();
    popover.open();
  }

  onActionClick(type: JsonTreeNodeAction, node: IJsonTreeNode) {
    this.propertyActionClick.emit({ type, node });
  }

  private _generateState() {
    for (const node of this._nodes) {
      if (!this.state[node.key]) {
        this.state[node.key] = {
          expanded: this._expanded,
          state: { },
        };
      }
    }
  }
}
