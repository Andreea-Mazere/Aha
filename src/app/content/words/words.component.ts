import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordsService } from '../../words/words.service';
import { Word } from '../../words/word';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  words: Observable<Word[]>;
  search: FormControl = new FormControl();
  wordText: FormControl =  new FormControl();
  word: FormControl = new FormControl();
  status: Observable<string>;
  subscriptions: Subscription[] = [];

  constructor(private readonly service: WordsService) { 
  }

  ngOnInit() {
    let searchStrings = this.search.valueChanges
      .pipe(startWith(this.search.value || ''))
      .pipe(debounceTime(250));
    this.word.valueChanges
      .subscribe(w => this.wordText.setValue(w.text));
    this.words = this.service.getWordsStartsWith(searchStrings)
      .publishReplay(1).refCount();
    this.subscriptions.push(this.words.subscribe(newWords => {
      if (this.word.value){
        let equivalentWordInNewCollection = 
          newWords.find(w => w.text == this.word.value.text);
        this.word.setValue(equivalentWordInNewCollection);
      }
    }));
    this.status =this.words.map(words =>{ 
      if (words.length > 0) return '';
      if (this.search.value) return 'No search results.';
      return "Please start typing the word you're looking for.";
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onUpload(event) {
    console.log('uploader event: ', event);
    if (event.files.length != 1) {
      console.log('expecting single file');
      return;
    }
    this.service.setWordImage(this.word.value.text, event.files[0]);
  }

}
