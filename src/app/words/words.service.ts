import { Injectable } from '@angular/core';
import { Word } from './word'
import { AngularFireDatabase } from 'angularfire2//database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { filter } from 'rxjs/operators';

@Injectable()
export class WordsService {
  words: Observable<Word[]>;

  constructor(
    private readonly db: AngularFireDatabase) { 
  }
  
  getWordsStartsWith(searchStrings: Observable<string>):Observable<Word[]>{
    return searchStrings
      .switchMap(sw => sw === null || sw === ''? 
      Observable.of([]):
      this.db.list('content/words', ref => 
        ref
          .orderByKey()
          .startAt(sw)
          .endAt(sw + '\uFFFF')
        )
        .valueChanges()
        .map(words => words.map(w => 
          new Word({
            text: w["text"],
            imageUrl: w["imageUrl"],
            soundUrl: w["soundUrl"]
          })
        ))
      );
  }
  
  getWords(): Promise<Word[]>{
    return new Promise<Word[]>((resolve, reject) => {
      resolve([
        new Word({
          text: 'casă',
          imageUrl: 'https://houseme.azureedge.net/images/Icons/svg/House-Me-Icons-SingleHouse.svg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/speech%2Fcas%C4%83.mp3?alt=media&token=b5a23b46-acd2-4ba0-9bc8-b318b6ff6056'
        }),
        new Word({
          text: 'pasă',
          imageUrl: 'http://coaching.worldrugby.org/images/keyfactors/passing.jpg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/speech%2Fpas%C4%83.mp3?alt=media&token=37ffb616-8031-45ec-8b53-dd2affb3633d'
        }),
        new Word({
          text: 'masă',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzG2F1onhyUN0d1K0blpYV-dATTJ67sGcYF9o22YIryzHdbb8wcg',
          soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/speech%2Fmas%C4%83.mp3?alt=media&token=b42fc256-8e6d-47d7-a810-1de96b6e8be4'
        })
      ]);
    });
  }
}
