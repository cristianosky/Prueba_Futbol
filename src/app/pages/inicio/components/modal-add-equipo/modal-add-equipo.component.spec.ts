import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEquipoComponent } from './modal-add-equipo.component';

describe('ModalAddEquipoComponent', () => {
  let component: ModalAddEquipoComponent;
  let fixture: ComponentFixture<ModalAddEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
