import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntriesService } from 'app/core/services/entries.service';
import { filter, take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoadEntryResolver implements Resolve<boolean> {
  constructor(private entriesService: EntriesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const entryId = route.paramMap.get('id');

    if (entryId == null) {
      return of(false);
    }

    return this.entriesService.getEntry(entryId).pipe(
      take(1),
      switchMap(entry => {
        if (entry == null) {
          this.entriesService.loadEntry(entryId);
        }

        return this.entriesService.getEntry(entryId).pipe(
          map(doc => !!doc),
          filter(doc => doc),
        );
      }),
      take(1)
    );
  }
}
