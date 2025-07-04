import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransationRetraireComponent } from './transation-retraire.component';

describe('TransationRetraireComponent', () => {
  let component: TransationRetraireComponent;
  let fixture: ComponentFixture<TransationRetraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransationRetraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransationRetraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
