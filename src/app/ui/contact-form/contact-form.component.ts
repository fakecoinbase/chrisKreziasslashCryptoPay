import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  namePattern = '[A-Z]{1,1}[a-z]*';
  emailForm = this.fb.group({
    subject: [null, [Validators.minLength(5), Validators.maxLength(100)]],
    firstName: [
      null,
      [
        Validators.required,
        Validators.pattern(this.namePattern),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
    lastName: [
      null,
      [
        Validators.required,
        Validators.pattern(this.namePattern),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
    email: [null, [Validators.required, Validators.email]],
    message: [null, Validators.required],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
