import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFileComponent } from './material-file.component';

describe('MaterialFileComponent', () => {
  let component: MaterialFileComponent;
  let fixture: ComponentFixture<MaterialFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
