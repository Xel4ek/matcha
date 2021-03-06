import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SearchService } from '@services/search/search.service';
import { WebsocketService } from '@services/websocket/websocket.service';
import { ProfileService } from '@services/profile/profile.service';
import { MapComponent } from '@components/map/map.component';
import { Options } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { UserInfoService } from '@services/user-info/user-info.service';
import { Subject } from 'rxjs';
import { map, mergeMap, takeUntil, takeWhile } from 'rxjs/operators';
import { CustomMarker } from '@components/map/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('map') map!: MapComponent;
  @ViewChild('trigger') trigger!: ElementRef;
  age = { min: 18, max: 99 };
  ageOptions: Options = {
    floor: 18,
    ceil: 99,
  };
  fame = { min: 0, max: 99 };
  fameOptions: Options = {
    floor: 0,
    ceil: 99,
  };
  desc = false;
  sortBy = 'Match';
  searchResults: Set<string> = new Set();
  markers: { [user: string]: CustomMarker } = {};
  tagList: string[] = [];
  loading = false;
  searchEnd = false;
  private update$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private login?: string;
  private observer?: IntersectionObserver;

  constructor(
    private searchService: SearchService,
    private ws: WebsocketService,
    private ps: ProfileService,
    private router: Router,
    private userInfo: UserInfoService
  ) {
    this.searchService.data$
      .pipe(
        takeUntil(this.destroy$),
        map(({ profiles }: { profiles: string[] }) => {
          if (profiles.length) {
            this.searchEnd = false;
            this.searchResults = new Set<string>([
              ...this.searchResults,
              ...profiles,
            ]);
          } else {
            this.searchEnd = true;
          }
          return profiles ?? [];
        }),
        mergeMap((profiles) => profiles),
        mergeMap((user: string) => {
          return this.userInfo.data$.pipe(
            map(({ [user]: info }) => {
              if (info && info.coordinates) {
                const { latitude: lat, longitude: lng } = info.coordinates;
                this.markers = {
                  ...this.markers,
                  ...{
                    [user]: {
                      latlng: [lat, lng],
                    },
                  },
                };
              }
              return info?.login;
            }),
            takeWhile((get) => !get)
          );
        })
      )
      .subscribe();

    this.ps.data$.pipe(takeUntil(this.destroy$)).subscribe((profile) => {
      if (profile.login) {
        this.login = profile.login;
        this.markers = {
          ...this.markers,
          ...{
            [profile.login]: {
              latlng: [
                profile.coordinates?.latitude,
                profile.coordinates?.longitude,
              ],
              popup: profile.name.firstName + ' ' + profile.name.lastName,
            },
          },
        };
      }
    });
  }

  search(offset = 0): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.searchEnd = false;
    setTimeout(() => {
      this.loading = false;
    }, 800);
    if (offset === 0) {
      this.update$.next();
      this.searchResults = new Set<string>();
      if (this.login) {
        this.markers = { [this.login]: this.markers[this.login] };
      }
    }
    if (this.map.getBounds()) {
      this.ws.send('search', {
        fame: this.fame,
        age: this.age,
        map: this.map.getBounds(),
        sortBy: this.sortBy,
        orderBy: this.desc,
        tagList: this.tagList,
        offset,
      });
    }
  }

  ngAfterViewInit(): void {
    this.map.setZoom(4);
    this.observer = new IntersectionObserver(() => {
      if (!this.loading && !this.searchEnd) {
        this.search(this.searchResults.size);
      }
    });
    this.observer.observe(this.trigger.nativeElement);
  }

  openInfo(user: string): void {
    this.router.navigate(['/user/' + user]);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.update$.next();
    this.update$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  editList(
    key: string,
    { action, data }: { action: string; data: string }
  ): void {
    let send = data.trim().toLowerCase();
    if (send) {
      if (action === 'add') {
        send = '#' + data.replace(/^[#]*/i, '');
        this.tagList.push(send);
      }
      if (action === 'remove') {
        this.tagList = this.tagList.filter((tag) => tag !== data);
      }
    }
  }

  ngOnInit(): void {}
}
