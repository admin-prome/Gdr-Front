import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreateFormComponent } from './issue-create-form.component';

describe('IssueCreateFormComponent', () => {
  let component: IssueCreateFormComponent;
  let fixture: ComponentFixture<IssueCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
