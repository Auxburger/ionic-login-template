import { TestBed } from '@angular/core/testing';

import { ServerConnectorService } from './server-connector.service';

describe('ServerConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerConnectorService = TestBed.get(ServerConnectorService);
    expect(service).toBeTruthy();
  });
});
