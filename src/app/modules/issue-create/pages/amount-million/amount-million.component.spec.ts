import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountMillionComponent } from './amount-million.component';

describe('AmountMillionComponent', () => {
  let component: AmountMillionComponent;
  let fixture: ComponentFixture<AmountMillionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountMillionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountMillionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
