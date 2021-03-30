import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutocompleteService } from '@services/autocomlete/autocomplite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-edit[list]',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss'],
})
export class ListEditComponent implements OnInit {
  autoCompleteList: Observable<string[]>;
  @Input() list!: string[];
  @Output() editList = new EventEmitter();

  constructor(private autoComplete: AutocompleteService) {
    this.autoCompleteList = this.autoComplete.data$;
  }

  ngOnInit(): void {}

  removeEntry(entry: string): void {
    this.editList.emit({ action: 'remove', data: entry });
  }

  addEntry(entry: HTMLInputElement): void {
    this.editList.emit({ action: 'add', data: entry.value });
    entry.value = '';
    this.autoComplete.query(entry.value);
  }

  change(value: string): void {
    this.autoComplete.query(value);
    this.editList.emit({ action: 'change', data: value });
  }
}
