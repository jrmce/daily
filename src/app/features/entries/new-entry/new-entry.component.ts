import { Component } from '@angular/core';
import { EntriesService } from 'app/core/services/entries.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {
  today = Date.now();

  constructor(private entriesService: EntriesService) { }

  onSubmitted(event: { form: any, id: undefined }) {
    const now = new Date().toISOString();

    this.entriesService.create({
      createdAt: now,
      updatedAt: now,
      ...event.form
    });
  }
}
