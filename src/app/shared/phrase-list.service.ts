import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhraseListService {

  constructor() { }
  
}
export interface PhraseListItem {
  's': string;
  isDone: boolean;
}
