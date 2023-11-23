import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSubtipoComponent } from './nuevo-subtipo.component';

describe('NuevoSubtipoComponent', () => {
  let component: NuevoSubtipoComponent;
  let fixture: ComponentFixture<NuevoSubtipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSubtipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoSubtipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
