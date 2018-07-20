import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../words/words.service';
import { Word } from '../../words/word';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  words: Observable<Word[]>;
  searchControl: FormControl;
  status: Observable<string>;
  constructor(private readonly service: WordsService) { 
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    let searchStrings = this.searchControl.valueChanges
      .pipe(startWith(this.searchControl.value || ''))
      .pipe(debounceTime(250));
    this.words = this.service.getWordsStartsWith(searchStrings)
      .publishReplay(1).refCount();
    this.status =this.words.map(words =>{ 
      if (words.length > 0) return '';
      if (this.searchControl.value) return 'No search results.';
      return "Please start typing the word you're looking for.";
    });
  }

}
