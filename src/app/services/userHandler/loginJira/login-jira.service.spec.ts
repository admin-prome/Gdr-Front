import { TestBed } from '@angular/core/testing';

import { LoginJiraService } from './login-jira.service';

describe('LoginJiraService', () => {
  let service: LoginJiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginJiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
