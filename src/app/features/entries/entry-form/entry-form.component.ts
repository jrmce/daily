import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {
  @Output() submitted = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required])
  });

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
