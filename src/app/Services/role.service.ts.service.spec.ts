import { TestBed } from '@angular/core/testing';

import { RoleServiceTsService } from './role.service.ts.service';

describe('RoleServiceTsService', () => {
  let service: RoleServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
