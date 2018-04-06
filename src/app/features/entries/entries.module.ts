import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'app/features/entries/routes';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { EntryComponent } from './entry/entry.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewEntryComponent } from './view-entry/view-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EntriesListComponent,
    NewEntryComponent,
    EntryComponent,
    EntryFormComponent,
    ViewEntryComponent,
    EditEntryComponent,
    ImageUploadComponent
  ]
})
export class EntriesModule { }
