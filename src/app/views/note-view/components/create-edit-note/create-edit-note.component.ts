import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteStoreService } from '../../services/note-store.service';
import { NoteItemModel } from '../../models/note.model';
import { ExtensionsService } from '../../../../services/extensions.service';

@Component({
  selector: 'app-create-edit-note',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule
  ],
  templateUrl: './create-edit-note.component.html',
  styleUrl: './create-edit-note.component.scss'
})
export class CreateEditNoteComponent {
  noteForm: FormGroup = new FormGroup('');
  options: string[] = ['Work', 'Personal', 'Ideas'];
  filteredOptions: Observable<string[]> | null = null;
  editId: string = '';
  buttonLabel: string = 'Add';
  noteItem?: NoteItemModel;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _extension: ExtensionsService,
    private _noteStore: NoteStoreService
  ) { }

  ngOnInit() {
    this.initForm()
    this.filteredOptions = this.noteForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    if (this.route.snapshot.params['id']) {
      this.editId = this.route.snapshot.params['id'];
      this.buttonLabel = 'Update';
      this.getItem();
    }
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: [''],
      category: ['']
    });
  }

  getItem() {
    this.noteItem = this._noteStore.getById(+this.editId);
    if (this.noteItem) {
      this.noteForm.controls['title'].setValue(this.noteItem.title);
      this.noteForm.controls['category'].setValue(this.noteItem.category);
      this.noteForm.controls['content'].setValue(this.noteItem.content);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  submitNote() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.noteForm.valid) {
        if (this.editId) {
          let updateItem = this.noteForm.value;
          updateItem.id = +this.editId
          this._noteStore.updateItem(updateItem);
          this._extension.openSnackBar('Note Updated Successfully :)', 'Yay');
          this.router.navigate(['/'])
        } else {
          this._noteStore.addNote(this.noteForm.value);
          this._extension.openSnackBar('Note Added Successfully :)', 'Yay');
          this.router.navigate(['/'])
        }
      } else {
        this._extension.openSnackBar('Fill Form Correctly!', 'Ok')
      }
      this.isLoading = false
    }, 2000);
  }
}
