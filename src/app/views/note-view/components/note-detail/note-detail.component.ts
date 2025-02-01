import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NoteStoreService } from '../../services/note-store.service';
import { NoteItemModel } from '../../models/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExtensionsService } from '../../../../services/extensions.service';

@Component({
  selector: 'app-note-detail',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent {
  noteId: string = '';
  noteItem?: NoteItemModel;
  constructor(
    private _route: ActivatedRoute,
    private _noteStore: NoteStoreService,
    private _extension: ExtensionsService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    if (this._route.snapshot.params['id']) {
      this.noteId = this._route.snapshot.params['id'];
      this.getItem()
    }
  }

  getItem() {
    this.noteItem = this._noteStore.getById(+this.noteId);
  }

  navigate(role: string) {
    this._router.navigate([role + this.noteId])
  }

  deleteNote(e: Event) {
    const confirm = window.confirm('Are you sure you want to delete this note?')
    if (confirm) {
      e.stopPropagation();
      this._noteStore.deleteItem(+this.noteId);
      this._extension.openSnackBar('Note Deleted Successfully', 'Oh')
      this._router.navigate([''])
    }
  }
}
