import { Routes } from '@angular/router';
import { NoteViewComponent } from './views/notes-list/notes-list.component';
import { CreateEditNoteComponent } from './views/notes-list/components/create-edit-note/create-edit-note.component';
import { NoteDetailComponent } from './views/note-detail/note-detail.component';

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
