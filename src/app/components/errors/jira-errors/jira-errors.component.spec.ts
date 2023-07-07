import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraErrorsComponent } from './jira-errors.component';

describe('JiraErrorsComponent', () => {
  let component: JiraErrorsComponent;
  let fixture: ComponentFixture<JiraErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiraErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
