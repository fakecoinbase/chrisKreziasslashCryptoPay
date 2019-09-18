import { TestBed } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  let util: UtilitiesService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    util = TestBed.get(UtilitiesService);
  });

  it('should be created', () => {
    expect(util).toBeTruthy();
  });

  it('should format date to YYYY-MM-DD', () => {
    const test = new Date('03/25/2015');
    const expected = '2015-03-25';
    expect(util.formatDate(test)).toEqual(expected);
  });
});
