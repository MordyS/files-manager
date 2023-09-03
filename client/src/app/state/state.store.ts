import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface FilesState {
  files: string[];
}

export function createInitialState(): FilesState {
  return {
    files: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'files' })
export class FilesStore extends Store<FilesState> {
  constructor() {
    super(createInitialState());
  }
}