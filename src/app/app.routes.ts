import { Routes } from '@angular/router';
import { NoteViewComponent } from './views/notes-list/notes-list.component';
import { NoteDetailComponent } from './views/note-detail/note-detail.component';
import { CreateEditNoteComponent } from './views/create-edit-note/create-edit-note.component';

export const routes: Routes = [
    {
        path: '',
        component: NoteViewComponent
    },
    {
        path: 'add',
        component: CreateEditNoteComponent
    },
    {
        path: 'edit/:id',
        component: CreateEditNoteComponent
    },
    {
        path: 'note/:id',
        component: NoteDetailComponent
    }
];
