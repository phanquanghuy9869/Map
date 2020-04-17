import { TestBed } from '@angular/core/testing';

import { GoogleMapService } from './google-map-service.service';

describe('GoogleMapServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleMapService = TestBed.get(GoogleMapService);
    expect(service).toBeTruthy();
  });
});
