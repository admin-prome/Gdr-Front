import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoIncidenteComponent } from './nuevo-incidente.component';

describe('NuevoIncidenteComponent', () => {
  let component: NuevoIncidenteComponent;
  let fixture: ComponentFixture<NuevoIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoIncidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
