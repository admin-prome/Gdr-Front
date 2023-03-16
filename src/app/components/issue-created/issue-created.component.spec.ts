import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreatedComponent } from './issue-created.component';

describe('IssueCreatedComponent', () => {
  let component: IssueCreatedComponent;
  let fixture: ComponentFixture<IssueCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCreatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
