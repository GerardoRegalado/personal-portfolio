import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have expected form controls', () => {
    expect(component.contactform.contains('name')).toBeTrue();
    expect(component.contactform.contains('email')).toBeTrue();
    expect(component.contactform.contains('country_code')).toBeTrue();
    expect(component.contactform.contains('phone')).toBeTrue();
    expect(component.contactform.contains('message')).toBeTrue();
  });

  it('should validate and open a mailto draft on submit', () => {
    const openSpy = spyOn(window, 'open').and.returnValue(null);

    component.contactform.setValue({
      name: 'Gerardo',
      email: 'gerardo@example.com',
      country_code: '+52',
      phone: '4491234567',
      message: 'Hola, me gustaria hablar sobre una oportunidad.'
    });

    component.onSubmit();

    expect(openSpy).toHaveBeenCalled();
    expect(component.submitState).toBe('success');
  });
});
