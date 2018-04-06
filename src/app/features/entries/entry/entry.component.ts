import { Component, Input } from '@angular/core';
import { Entry } from 'app/core/models/entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() entry: Entry;
}
