import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { NoteItemModel } from '../../../../shared/models/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ExtensionsService } from '../../../../shared/services/extensions.service';
import { NoteStoreService } from '../../../../shared/services/note-store.service';

@Component({
  selector: 'app-note-card',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() note!: NoteItemModel;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _router: Router,
    private _extension: ExtensionsService,
    private _noteStore: NoteStoreService
  ) { }
  truncatedDescription = computed(() => {
    let description = this.note.content;
    if (description.length > 50) {
      description = description.substring(0, 50) + ' ...';
    }
    return description;
  })

  navigate(role: string) {
    this._router.navigate([role + this.note.id])
  }

  deleteNote(e: Event) {
    e.stopPropagation()
    const confirm = window.confirm('Are you sure you want to delete this note?')
    if (confirm) {
      e.stopPropagation();
      this._noteStore.deleteItem(this.note.id)
      this._extension.openSnackBar('Note Deleted Successfully', 'Oh')
      this.onDelete.emit()
    }
  }
}
