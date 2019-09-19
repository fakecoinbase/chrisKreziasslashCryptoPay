import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalTransferComponent } from './paypal-transfer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaypalTransferComponent', () => {
  let component: PaypalTransferComponent;
  let fixture: ComponentFixture<PaypalTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaypalTransferComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
