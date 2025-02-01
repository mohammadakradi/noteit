import { Injectable } from '@angular/core';
import { NoteItemModel } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {
  private storageKey = 'noteStore';

  constructor() { }

  private generateId(items: NoteItemModel[]): number {
    return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }

  addNote(item: Omit<NoteItemModel, 'id'>): NoteItemModel {
    const items = this.getItems();
    const newItem: NoteItemModel = {
      id: this.generateId(items),
      ...item
    };
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  getItems(): NoteItemModel[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  deleteItem(id: number): void {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
  }

  getById(id: number): NoteItemModel | undefined {
    const items = this.getItems();
    return items.find(item => item.id === id);
  }

  updateItem(updatedItem: NoteItemModel): void {
    const items = this.getItems();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.saveItems(items);
    }
  }

  private saveItems(items: NoteItemModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
