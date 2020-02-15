/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertyifyService } from './alertyify.service';

describe('Service: Alertyify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertyifyService]
    });
  });

  it('should ...', inject([AlertyifyService], (service: AlertyifyService) => {
    expect(service).toBeTruthy();
  }));
});
