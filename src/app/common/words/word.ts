export class Word {
  readonly text;
  readonly imageUrl;
  readonly soundUrl;
  constructor(data: {
    text: string,
    imageUrl: string,
    soundUrl: string
  }) {
    this.text = data.text;
    this.imageUrl = data.imageUrl;
    this.soundUrl = data.soundUrl;
  }

  static Null = new Word({imageUrl: '',soundUrl:'', text:''})
}