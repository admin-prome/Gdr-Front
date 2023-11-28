import { TestBed } from '@angular/core/testing';

import { IssuesServicesService } from './issues-services.service';

describe('IssuesServicesService', () => {
  let service: IssuesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
