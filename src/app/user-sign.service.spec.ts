import { TestBed } from '@angular/core/testing';

import { UserSignService } from './user-sign.service';

describe('UserSignService', () => {
  let service: UserSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
