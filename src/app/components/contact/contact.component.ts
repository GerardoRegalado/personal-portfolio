import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'port-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  public contactform = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    country_code: new FormControl(),
    phone: new FormControl(),
    message: new FormControl()
  })


  public onSubmit(){
    console.log(this.contactform.value)
  }
}
