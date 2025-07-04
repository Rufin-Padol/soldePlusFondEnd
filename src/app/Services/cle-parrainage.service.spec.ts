import { TestBed } from '@angular/core/testing';

import { CleParrainageService } from './cle-parrainage.service';

describe('CleParrainageService', () => {
  let service: CleParrainageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleParrainageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
