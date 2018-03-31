import { Injectable } from '@angular/core';
import { Word } from './word'

@Injectable()
export class WordsService {

  constructor() { }
  
  getWords(): Promise<Word[]>{
    return new Promise<Word[]>((resolve, reject) => {
      resolve([
        new Word({
          text: 'casă',
          imageUrl: 'https://houseme.azureedge.net/images/Icons/svg/House-Me-Icons-SingleHouse.svg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/cas%C4%83.webm?alt=media&token=5d6089e2-a157-46cc-85a0-4b89cb528a0b'
        }),
        new Word({
          text: 'pasă',
          imageUrl: 'http://coaching.worldrugby.org/images/keyfactors/passing.jpg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/cas%C4%83.webm?alt=media&token=5d6089e2-a157-46cc-85a0-4b89cb528a0b'
        }),
        new Word({
          text: 'masă',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzG2F1onhyUN0d1K0blpYV-dATTJ67sGcYF9o22YIryzHdbb8wcg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/cas%C4%83.webm?alt=media&token=5d6089e2-a157-46cc-85a0-4b89cb528a0b'
        })
      ]);
    });
  }
}
