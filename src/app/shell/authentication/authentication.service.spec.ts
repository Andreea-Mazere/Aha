import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReplaySubject } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const authState = new ReplaySubject(1);
  beforeEach(() => {
    const angularFireSpy = jasmine.createSpyObj('AngularFireAuth', ['auth', 'authState']);
    angularFireSpy.authState = authState;
    TestBed.configureTestingModule({
      providers: [AuthenticationService, 
        {provide: AngularFireAuth, useValue: angularFireSpy}
      ]
    });
    service = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
