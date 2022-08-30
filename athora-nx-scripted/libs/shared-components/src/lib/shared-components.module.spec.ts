import { async, TestBed } from '@angular/core/testing';
import { SharedComponentsModule } from './shared-components.module';

describe('SharedComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(SharedComponentsModule).toBeDefined();
  });
});
