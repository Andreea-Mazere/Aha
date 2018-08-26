import { Injectable } from '@angular/core';
import { Word } from './word'
import { AngularFireDatabase } from 'angularfire2//database';
import { AngularFireStorage } from 'angularfire2//storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Md5 } from 'ts-md5';
import { Polly } from 'aws-sdk';

@Injectable()
export class WordsService {
  words: Observable<Word[]>;

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly storage: AngularFireStorage,
  ) { }
  setWordImage(word: string, imageFile: any): Promise<any> {
    console.log('should upload file for word ' + word + ': ', imageFile);
    console.log('getting hash...');
    return this.fileHash(imageFile)
      .then (hash => {
        console.log('hash = ', hash);
        let filePath = `content/images/${this.sanitizeFileName(imageFile.name)}-${hash}`;
        let storageFile = this.storage.storage.ref(filePath);
        console.log('uploading file...');
        return storageFile.put(imageFile)
          .then(() => storageFile.getDownloadURL());
      })
      .then(url => {
        console.log('uploaded. url = ', url);
        let ref = this.db.database.ref('/').child('content').child('words').child(word);
        console.log('updating word imageUrl...');
        return ref.update({imageUrl: url});
      })
    
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

  deleteWord(text: string): Promise<any> {
    console.log('deleting ' + text + "...")
    let ref = this.db.database.ref('/').child('content').child('words').child(text);
    return ref.remove();
  }

  addWord(text: string): Promise<any> {
    let ref = this.db.database.ref('/').child('config').child('thirdParty').child('aws');
    return ref.once('value')
      .then(snapshot => new Promise<Polly.SynthesizeSpeechOutput>((resolve, reject) => {
        console.log(snapshot.val());
        let polly = new Polly({
          credentials: snapshot.val(),
          apiVersion: '2016-06-10',
          region: 'eu-central-1'
        });
        let params = { 
          OutputFormat: "ogg_vorbis", 
          SampleRate: "8000", 
          Text: text, 
          TextType: "text", 
          VoiceId: "Carmen"
        };
        polly.synthesizeSpeech(params, function(err, data) {
          if (err) reject(err);
          else resolve(data);          
        });
      }))
      .then (speechData => {        
        let filePath = `content/speech/${this.sanitizeFileName(text)}`;
        let storageFile = this.storage.storage.ref(filePath);
        console.log('uploading file...');
        let audioStream:any = speechData.AudioStream;
        var uInt8Array = new Uint8Array(audioStream);
        return storageFile.put(uInt8Array)
        .then(() => storageFile.getDownloadURL());
      })
      .then (url => {
        console.log('downloadUrl = ', url);
        let word = {
          text: text, 
          imageUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', 
          soundUrl:  url
        };
        let ref = this.db.database.ref('/').child('content').child('words').child(text);
        return ref.set(word);  
     });
  }

  private fileHash( file ): Promise<string> { 
    return new Promise((resolve, reject) =>  {
      //Instantiate a reader		  
      var reader = new FileReader();
          
      //What to do when we gets data?
      reader.onload = function( e ){
        var hasher = new Md5();
        hasher.appendByteArray(e.target.result);
        var hash = hasher.end().toString();
        resolve( hash );
      }
			
      reader.readAsBinaryString( file );
    });
  }
  private sanitizeFileName(original: string): string {
    let illegalRe = /[\/\?<>\\:\*\|":]/g;
    let controlRe = /[\x00-\x1f\x80-\x9f]/g;
    let sanitized = original
        .replace(illegalRe, '')
        .replace(controlRe, '');
    return sanitized;
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
