import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordsService } from '../../common/words/words.service';
import { Word } from '../../common/words/word';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  words: Observable<Word[]>;
  search: FormControl = new FormControl();
  word: FormControl = new FormControl();
  status: Observable<string>;
  canAddFromSearch: Observable<boolean>;
  subscriptions: Subscription[] = [];
  addDialogVisible: boolean;

  constructor(private readonly service: WordsService) { 
  }

  ngOnInit() {
    let searchStrings = this.search.valueChanges
      .pipe(startWith(this.search.value || ''))
      .pipe(debounceTime(250));
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
    this.canAddFromSearch = this.words.map(words => {
      return this.search.value && 
        !words.find(w => w.text === this.search.value);
    });
  }

  addClicked() {
    this.service.addWord(this.search.value);//todo: error handling
  }
  deleteClicked() {
    this.service.deleteWord(this.word.value.text);//todo: error handling
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
