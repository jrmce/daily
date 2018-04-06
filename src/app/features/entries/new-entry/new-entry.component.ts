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

  onSubmitted(form: any) {
    const createdAt = new Date().toISOString();

    this.entriesService.create({
      createdAt,
      updatedAt: createdAt,
      ...form
    });
  }
}
