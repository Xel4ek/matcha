import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-edit[list]',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {

  @Input() list!: string[];
  @Output() remove = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() editList = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.list);
  }
  removeEntry(entry: string) {
    console.log('removed from list', entry);
    this.editList.emit({action: 'remove', data: entry});
  }
  addEntry(entry: HTMLInputElement) {
    // console.log(entry.value);
    // this.add.emit(entry.value);
    this.editList.emit({action: 'add', data: entry.value});
    entry.value = '';
  }
}
