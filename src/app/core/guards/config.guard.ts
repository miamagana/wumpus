import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromCore from '../store';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigGuard implements CanActivate {
  constructor(private readonly store: Store<fromCore.CoreState>) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromCore.getConfigured),
      map((configured) => {
        if (!configured) {
          this.store.dispatch(fromCore.go({ path: ['config'] }));
        }
        return configured;
      })
    );
  }
}
