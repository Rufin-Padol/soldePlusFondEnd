import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierEmailComponent } from './verifier-email.component';

describe('VerifierEmailComponent', () => {
  let component: VerifierEmailComponent;
  let fixture: ComponentFixture<VerifierEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifierEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifierEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
