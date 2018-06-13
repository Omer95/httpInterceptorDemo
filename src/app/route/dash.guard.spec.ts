import { TestBed, async, inject } from '@angular/core/testing';

import { DashGuard } from './dash.guard';

describe('DashGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashGuard]
    });
  });

  it('should ...', inject([DashGuard], (guard: DashGuard) => {
    expect(guard).toBeTruthy();
  }));
});
