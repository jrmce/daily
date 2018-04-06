import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entry } from 'app/core/models/entry';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryFormComponent implements OnChanges {
  @Input() entry: Entry = {
    text: ''
  } as Entry;
  @Output() submitted = new EventEmitter<{ form: any; id: string | undefined }>();
  form: FormGroup;

  ngOnChanges(): void {
    this.form = new FormGroup({
      text: new FormControl(this.entry.text, [Validators.required])
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit({ form: this.form.value, id: this.entry.id });
    }
  }
}
