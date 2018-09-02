import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });
  });

  it('should be created', inject([NavigationService], (service: NavigationService) => {
    expect(service).toBeTruthy();
  }));
});
