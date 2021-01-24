import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from "@services/profile/profile.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth: boolean = false;
  constructor(private profileService: ProfileService,
              private router: Router) {
    this.auth = sessionStorage.getItem('auth') === 'true';
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth) {
      return true;
    }
    return this.profileService.auth().pipe(tap(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
      }
    }));
  }
}
