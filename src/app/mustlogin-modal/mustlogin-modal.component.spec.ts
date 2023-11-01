import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustloginModalComponent } from './mustlogin-modal.component';

describe('MustloginModalComponent', () => {
  let component: MustloginModalComponent;
  let fixture: ComponentFixture<MustloginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustloginModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustloginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
