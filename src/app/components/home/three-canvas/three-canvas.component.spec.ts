import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCanvasComponent } from './three-canvas.component';

describe('ThreeCanvasComponent', () => {
  let component: ThreeCanvasComponent;
  let fixture: ComponentFixture<ThreeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeCanvasComponent]
    }).compileComponents();
  });

  afterEach(() => {
    delete (window as { VANTA?: unknown }).VANTA;
  });

  it('should create and initialize VANTA effect', () => {
    const effect = { destroy: jasmine.createSpy('destroy') };
    const dotsSpy = jasmine.createSpy('DOTS').and.returnValue(effect);
    (window as { VANTA?: { DOTS: typeof dotsSpy } }).VANTA = { DOTS: dotsSpy };

    fixture = TestBed.createComponent(ThreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(dotsSpy).toHaveBeenCalled();

    fixture.destroy();
    expect(effect.destroy).toHaveBeenCalled();
  });
});
