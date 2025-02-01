import { Component, HostListener, signal } from '@angular/core';
import { NoteStoreService } from './services/note-store.service';
import { NoteItemModel } from './models/note.model';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-note-view',
  imports: [
    NoteCardComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NoteViewComponent {
  notes: NoteItemModel[] = [];
  filteredNotes: NoteItemModel[] = [];
  selectedOption: string = '';
  cols: number = 3;
  notesCount = signal(0);
  options: string[] = ['Work', 'Personal', 'Ideas'];
  searchValue: string = ''

  constructor(
    private _noteStore: NoteStoreService
  ) { }

  ngOnInit(): void {
    this.getNotesList();
  }

  getNotesList() {
    this.notes = this._noteStore.getItems();
    this.filteredNotes = this.notes;
    this.notesCount.set(this.filteredNotes.length)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width <= 425) {
      this.cols = 1;
    } else if (width <= 900) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

  filterNotes(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
      this.getNotesList();
    } else {
      this.selectedOption = option;
      this.filteredNotes = this.notes.filter(item => item.category === option)
      this.notesCount.set(this.filteredNotes.length)
    }
  }
  isSelectedFilter(option: string) {
    return this.selectedOption === option
  }

  searchNotes() {
    this.selectedOption = ''
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      note.category.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      note.content.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    this.notesCount.set(this.filteredNotes.length)
  }
}
