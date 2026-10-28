import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define the four role limits and launch prices for each business', () => {
    expect(component.planesERP.map((plan) => plan.roles)).toEqual([
      '2 roles',
      '5 roles',
      '10 roles',
      '11+ roles'
    ]);
    expect(component.negociosERP).toHaveLength(6);
    expect(component.negociosERP.every((negocio) => negocio.precios.length === 4)).toBe(true);
  });

  it('should use the selected business prices in the pricing cards', () => {
    component.negocioSeleccionado = component.negociosERP[3];

    expect(component.negocioSeleccionado.nombre).toBe('Supermercado');
    expect(component.negocioSeleccionado.precios).toEqual([89900, 149900, 239900, 349900]);
  });

  it('should open WhatsApp with the demo request details', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    component.seleccionarNegocio('Taller');
    component.datosContacto.nombre = 'Taller de prueba';
    component.datosContacto.whatsapp = '+57 300 000 0000';
    const event = new Event('submit', { cancelable: true });

    component.enviarFormulario(event);

    expect(event.defaultPrevented).toBe(true);
    expect(openSpy).toHaveBeenCalled();
    expect(decodeURIComponent(String(openSpy.mock.calls[0][0] ?? ''))).toContain('Taller de prueba');
    expect(component.pasoActual).toBe(3);
  });
});
