import { TestBed } from '@angular/core/testing';

import { UtlisateurService } from './utlisateur.service';

describe('UtlisateurService', () => {
  let service: UtlisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtlisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
