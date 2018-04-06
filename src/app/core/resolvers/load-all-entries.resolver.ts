import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntriesService } from 'app/core/services/entries.service';
import { filter, take, map } from 'rxjs/operators';
@Injectable()
export class LoadAllEntriesResolver implements Resolve<boolean> {
  constructor(private entriesService: EntriesService) { }

  resolve(): Observable<boolean> {
    return this.entriesService.getTotal().pipe(
      map(total => {
        if (total == null || total === 0) {
          this.entriesService.loadAll();
        }

        return true;
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
