import { Component, OnInit } from '@angular/core';
import { SearchService } from "@services/search.service";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: any;
  constructor(private searchService: SearchService, private ws: WebsocketService) {
    this.searchService.data$.subscribe(data => {
      console.log('Search Service', data);
      this.searchResults = data;
    })
  }

  ngOnInit(): void {
  }
  search(input: any): void {
    console.log('Search query', input);
    this.ws.send('search', input)
  }

}
