import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNoteComponent } from './create-edit-note.component';

describe('CreateEditNoteComponent', () => {
  let component: CreateEditNoteComponent;
  let fixture: ComponentFixture<CreateEditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
