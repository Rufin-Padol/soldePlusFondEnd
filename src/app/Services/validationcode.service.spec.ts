import { TestBed } from '@angular/core/testing';

import { ValidationcodeService } from './validationcode.service';

describe('ValidationcodeService', () => {
  let service: ValidationcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
