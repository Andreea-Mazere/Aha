import { Component, OnInit, Input,
  ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { Word } from '../word';

@Component({
  selector: 'app-word-slide',
  templateUrl: './word-slide.component.html',
  styleUrls: ['./word-slide.component.css']
})
export class WordSlideComponent implements OnInit {
  init(word: Word): void {
    this._word = word;
    this.textHidden = true;
    this.audioPlayedForThisWord = false;
    this.interactionEndedEmitted = false;
  }

  private _word: Word;
  get word() {return this._word;}
  @Input()
  set word(value: Word) {this.init(value)}
  
  @Output()
  interactionEnded: EventEmitter<any> = new EventEmitter();

  @ViewChild('audio')
  audioRef: ElementRef;

  textHidden: boolean;
  audioPlayedForThisWord: boolean;
  interactionEndedEmitted: boolean;

  get audio() { return this.audioRef.nativeElement }

  onClickImage() {
    this.textHidden = false;
    this.readWordAloud();
  }

  onClickText() {
    debugger;
    this.readWordAloud();
  }

  private readWordAloud() {
    this.audio.play();
    this.audioPlayedForThisWord = true;
  }

  onEndedAudio() {
    if (!this.audioPlayedForThisWord ||
      this.interactionEndedEmitted) 
      return;
    this.interactionEndedEmitted = true;
    setTimeout(() => {
      this.interactionEnded.emit();
    }, 5000)
  }

  constructor() { 
    this.init(Word.Null)
  }

  ngOnInit() {
  }

}
