import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent {
  transferForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    receiveEmail: [null, [Validators.required, Validators.email]],
    amount: [
      null,
      [Validators.required, Validators.pattern('([0-9]*[.])?[0-9]+')],
    ],
    currency: [null, Validators.required],
  });

  currencies = [
    { name: 'Bitcoin', abbreviation: 'BTC' },
    { name: 'Etherium', abbreviation: 'ETH' },
    { name: 'Litecoin', abbreviation: 'LTC' },
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
