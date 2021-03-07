import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from "@services/search.service";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ProfileService } from "@services/profile/profile.service";
import { MapComponent } from "@components/map/map.component";
import { LatLngExpression } from "leaflet";
import { Options } from "@angular-slider/ngx-slider";
import { Router } from "@angular/router";
import { UserInfoService } from "@services/user-info/user-info.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') map!: MapComponent;
  age = {min: 18, max: 99};
  ageOptions: Options = {
    floor: 18,
    ceil: 99
  };
  fame = {min: 0, max: 99};
  fameOptions: Options = {
    floor: 0,
    ceil: 99
  }
  desk = false;
  sortBy = 'Rating';
  searchResults: { profiles?: [string] } = {};
  markers: LatLngExpression[] = [];
  searchMarkers: LatLngExpression[] = [];
  private userInfoSubscriber?: Subscription;
  private searchServiceSubscriber?: Subscription;
  constructor(
    private searchService: SearchService,
    private ws: WebsocketService,
    private ps: ProfileService,
    private router: Router,
    private userInfo: UserInfoService
  ) {
    this.searchServiceSubscriber = this.searchService.data$.subscribe(data => {
      console.log('Search Service', data);
      this.searchResults = data;
      this.userInfoSubscriber?.unsubscribe();
      this.userInfoSubscriber = this.userInfo.data$.subscribe((users)=> {
        this.searchMarkers = [];
        this.searchResults.profiles?.map(user => {
          if (users[user]) {
            const {latitude: lat, longitude: lng} = users[user].coordinates;
            this.searchMarkers.push([lat, lng]);
          }
        })
      })
    })
    this.ps.data$.subscribe(profile => this.markers.push([profile.coordinates.latitude,
      profile.coordinates.longitude]))
  }

  search(): void {
    this.ws.send('search', {
      fame: this.fame,
      age: this.age,
      map: this.map.getBounds(),
      sortBy: this.sortBy,
      orderBy: this.desk,
      limits: {start: 0, end: 123}});
  }

  ngAfterViewInit(): void {
    console.log(this.map);
  }

  openInfo(user: string) {
    this.router.navigate(['/user/' + user]);
  }

  ngOnDestroy(): void {
    this.userInfoSubscriber?.unsubscribe();
    this.searchServiceSubscriber?.unsubscribe();
  }
}
