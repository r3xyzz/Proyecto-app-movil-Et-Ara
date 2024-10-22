import { TestBed } from '@angular/core/testing';

import { QueHaceresService } from './que-haceres.service';

describe('QueHaceresService', () => {
  let service: QueHaceresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueHaceresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
