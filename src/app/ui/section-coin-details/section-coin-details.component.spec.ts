import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCoinDetailsComponent } from './section-coin-details.component';

describe('SectionCoinDetailsComponent', () => {
  let component: SectionCoinDetailsComponent;
  let fixture: ComponentFixture<SectionCoinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCoinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
