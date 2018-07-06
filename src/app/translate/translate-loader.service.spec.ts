import { TestBed, inject } from '@angular/core/testing';

import { TranslateLoaderService } from './translate-loader.service';

describe('TranslateLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateLoaderService]
    });
  });

  it('should be created', inject([TranslateLoaderService], (service: TranslateLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
