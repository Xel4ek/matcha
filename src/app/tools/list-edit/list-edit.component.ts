import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-edit[list]',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {

  @Input() list!: string[];
  @Output() editList = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  removeEntry(entry: string) {
    this.editList.emit({action: 'remove', data: entry});
  }
  addEntry(entry: HTMLInputElement) {
    this.editList.emit({action: 'add', data: entry.value});
    entry.value = '';
  }
  change(value: string) {
    this.editList.emit({ action: 'change', data: value})
  }
}
