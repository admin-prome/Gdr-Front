import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRadioComponent } from './material-radio.component';

describe('MaterialRadioComponent', () => {
  let component: MaterialRadioComponent;
  let fixture: ComponentFixture<MaterialRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
