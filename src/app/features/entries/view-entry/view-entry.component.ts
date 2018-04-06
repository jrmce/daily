import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entry } from 'app/core/models/entry';
import { EntriesService } from 'app/core/services/entries.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.css']
})
export class ViewEntryComponent {
  entry$: Observable<Entry|null>;

  constructor(
    private entriesService: EntriesService,
    private route: ActivatedRoute) {
      this.entry$ = this.route.paramMap.pipe(
        map(params => params.get('id')),
        switchMap(id => {
          if (id != null) {
            return this.entriesService.getEntry(id);
          }

          return of(null);
        })
      );
  }
}
