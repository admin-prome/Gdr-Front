import { TestBed } from '@angular/core/testing';

import { GetFormsService } from './getForms.service';

describe('GetFormsService', () => {
  let service: GetFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
