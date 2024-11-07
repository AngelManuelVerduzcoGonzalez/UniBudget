import { TestBed } from '@angular/core/testing';

import { CopiaSeguridadService } from './copia-seguridad.service';

describe('CopiaSeguridadService', () => {
  let service: CopiaSeguridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopiaSeguridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
