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
  constructor() { }

  ngOnInit(): void {
    console.log(this.list);
  }
  removeEntry(entry: string) {
    console.log('removed from list', entry);
    this.remove.emit(entry);
  }
  addEntry(entry: HTMLInputElement) {
    console.log(entry.value);
    this.add.emit(entry.value);
    entry.value = '';
  }
}
