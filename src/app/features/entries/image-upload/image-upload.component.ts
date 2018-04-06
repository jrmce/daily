import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  downloadURL: any;
  uploadProgress$: any;
  task: any;
  ref: AngularFireStorageReference;

  constructor(private afStorage: AngularFireStorage) { }

  upload(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]).snapshotChanges().map(ch => );
    this.uploadProgress$ = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
  }
}
