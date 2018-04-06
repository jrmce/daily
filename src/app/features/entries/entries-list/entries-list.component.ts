import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entry } from 'app/core/models/entry';
import { EntriesService } from 'app/core/services/entries.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent {
  entries$: Observable<Entry[]>;
  today$: Observable<Entry|null>;

  constructor(private entriesService: EntriesService) {
    this.entries$ = this.entriesService.getAllEntries();
    this.today$ = this.entriesService.getToday();
  }
}
