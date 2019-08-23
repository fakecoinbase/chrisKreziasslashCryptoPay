import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalTransferComponent } from './paypal-transfer.component';

describe('PaypalTransferComponent', () => {
  let component: PaypalTransferComponent;
  let fixture: ComponentFixture<PaypalTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalTransferComponent ]
    })
    .compileComponents();
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
