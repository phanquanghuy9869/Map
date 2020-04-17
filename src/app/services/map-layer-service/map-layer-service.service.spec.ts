import { TestBed } from '@angular/core/testing';

import { MapLayerService } from './map-layer-service.service';

describe('MapLayerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapLayerService = TestBed.get(MapLayerService);
    expect(service).toBeTruthy();
  });
});
