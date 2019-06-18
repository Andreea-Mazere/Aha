import { TestBed, inject } from '@angular/core/testing';

import { WordsService } from './words.service';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('WordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule,RouterTestingModule]
    });
  });

  it('should be created', inject([WordsService], (service: WordsService) => {
    expect(service).toBeTruthy();
  }));
});
