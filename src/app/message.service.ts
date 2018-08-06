import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  add(massage: string) {
    this.messages.push(massage);
  }
  clear() {
   this.messages = [];
  }

  constructor() { }
}
