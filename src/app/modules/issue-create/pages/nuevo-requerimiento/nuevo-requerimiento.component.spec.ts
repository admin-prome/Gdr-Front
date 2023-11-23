import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRequerimientoComponent } from './nuevo-requerimiento.component';

describe('NuevoRequerimientoComponent', () => {
  let component: NuevoRequerimientoComponent;
  let fixture: ComponentFixture<NuevoRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoRequerimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
