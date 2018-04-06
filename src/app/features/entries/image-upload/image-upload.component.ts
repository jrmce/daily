import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Entry } from 'app/core/models/entry';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() entry: Entry;
  @Output() submitted = new EventEmitter<{ file: File; entry: Entry }>();

  upload(files: FileList): void {
    if (files instanceof FileList) {
      this.submitted.emit({ file: files[0], entry: this.entry });
    }
  }
}
