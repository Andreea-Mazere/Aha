import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../common/words/words.service';
import { Word } from '../../common/words/word';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

   words: Word[];
   currentWordIndex: number

   get currentWord() :Word { 
     if (this.words === undefined || this.words.length === 0)
     {
       return Word.Null;
     }
     return this.words[this.currentWordIndex]
    }
   
   onCurrentWordInteractionEnded() {
     if (this.currentWordIndex >= this.words.length - 1)
     {
       //todo: emit end event or something?
       return;
     }
     this.currentWordIndex ++;
   }

   constructor(private readonly service: WordsService) { 
   }

  ngOnInit() {
    this.service.getWords().then(words => {
      this.words = words;
      this.currentWordIndex = 0;
    })
  }

}
