import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStepperCreateComponent } from './issue-stepper-create.component';

describe('IssueStepperCreateComponent', () => {
  let component: IssueStepperCreateComponent;
  let fixture: ComponentFixture<IssueStepperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueStepperCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueStepperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
