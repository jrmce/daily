import { Component } from '@angular/core';
import { EntriesService } from 'app/core/services/entries.service';
import { Observable } from 'rxjs/Observable';
import { Entry } from 'app/core/models/entry';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {
  entry$: Observable<Entry | null>;

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

  onSubmitted(event: { form: any, id: string }) {
    const now = new Date().toISOString();

    this.entriesService.update({
      updatedAt: now,
      id: event.id,
      ...event.form
    });
  }
}
