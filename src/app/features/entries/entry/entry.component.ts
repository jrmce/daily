import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Entry } from 'app/core/models/entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryComponent {
  @Input() entry: Entry;
}
