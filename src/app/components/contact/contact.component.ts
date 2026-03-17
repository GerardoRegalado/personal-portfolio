import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'port-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: false
})
export class ContactComponent {
  public readonly contactEmail = 'gerardo.regalado24@gmail.com';
  public isSubmitted = false;
  public submitState: 'idle' | 'success' = 'idle';

  public contactform = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    country_code: new FormControl('+52', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\+\d{1,4}$/)] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9()\s-]{7,20}$/)] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)] })
  });


  public onSubmit(): void {
    this.isSubmitted = true;
    this.submitState = 'idle';

    if (this.contactform.invalid) {
      this.contactform.markAllAsTouched();
      return;
    }

    const { name, email, country_code, phone, message } = this.contactform.getRawValue();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${country_code} ${phone}`,
      '',
      message
    ].join('\n'));

    if (typeof window !== 'undefined') {
      window.open(`mailto:${this.contactEmail}?subject=${subject}&body=${body}`, '_self');
    }

    this.submitState = 'success';
  }

  public hasError(controlName: 'name' | 'email' | 'country_code' | 'phone' | 'message'): boolean {
    const control = this.contactform.controls[controlName];
    return control.invalid && (control.touched || this.isSubmitted);
  }

  public get remainingCharacters(): number {
    return 500 - this.contactform.controls.message.value.length;
  }
}
