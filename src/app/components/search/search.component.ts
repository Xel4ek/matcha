import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchService } from "@services/search/search.service";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ProfileService } from "@services/profile/profile.service";
import { MapComponent } from "@components/map/map.component";
import { Options } from "@angular-slider/ngx-slider";
import { Router } from "@angular/router";
import { UserInfoService } from "@services/user-info/user-info.service";
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { CustomMarker } from "@components/map/map";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('map') map!: MapComponent;
  @ViewChild('trigger') trigger!: ElementRef;
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
  desc = false;
  sortBy = 'Match';
  searchResults: string[] = [];
  markers: { [user: string]: CustomMarker } = {};
  tagList: string[] = [];
  loading = false;
  private update$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private login?: string;

  constructor(
    private searchService: SearchService,
    private ws: WebsocketService,
    private ps: ProfileService,
    private router: Router,
    private userInfo: UserInfoService,
  ) {
    this.searchService.data$.pipe(takeUntil(this.destroy$),
      mergeMap(({profiles}: { profiles: string[] }) => {
        if (Array.isArray(profiles))
          this.searchResults.push(...profiles);
        return profiles ?? [];
      }),
      map((user: string) => {
          this.userInfo.data$.pipe(takeUntil(this.update$)).subscribe(({[user]: info}) => {
            if (info && info.coordinates) {
              const {latitude: lat, longitude: lng} = info.coordinates;
              this.markers = {
                ...this.markers, ...{
                  [user]: {
                    latlng: [lat, lng]
                  }
                }
              }
            }
          })
        }
      )
    ).subscribe();

    this.ps.data$.pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        if (profile.login) {
          this.login = profile.login;
          this.markers = {
            ...this.markers, ...{
              [profile.login]: {
                latlng: [profile.coordinates?.latitude,
                  profile.coordinates?.longitude],
                popup: profile.name.firstName + ' ' + profile.name.lastName
              }
            }
          }
        }
      })
  }

  search(offset = 0): void {
    if (offset === 0) {
      this.update$.next();
      this.searchResults = [];
      if (this.login)
        this.markers = {[this.login]: this.markers[this.login]};
    }
    if (this.map.getBounds()) {
      this.ws.send('search', {
        fame: this.fame,
        age: this.age,
        map: this.map.getBounds(),
        sortBy: this.sortBy,
        orderBy: this.desc,
        tagList: this.tagList,
        offset
      });
    }
  }

  ngAfterViewInit(): void {
    this.map.setZoom(4);
    new IntersectionObserver(() => {
      if (!this.loading && this.searchResults.length % 20 === 0) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 300);
        this.search(this.searchResults.length);
      }
    }, {
      rootMargin: '0px',
      threshold: .3
    }).observe(this.trigger.nativeElement);

  }

  openInfo(user: string) {
    this.router.navigate(['/user/' + user]);
  }

  ngOnDestroy(): void {
    this.update$.next();
    this.update$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  editList(key: string, {action, data}: { action: string, data: string }) {
    let send = data.trim().toLowerCase();
    if (send) {
      if (action === 'add') {
        send = '#' + data.replace(/^[#]*/i, '');
        this.tagList.push(send);
      }
      if (action === 'remove') {
        this.tagList = this.tagList.filter(tag => tag !== data);
      }
    }
  }

  ngOnInit(): void {
  }
}
