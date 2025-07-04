import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransationComponent } from './transation.component';

describe('TransationComponent', () => {
  let component: TransationComponent;
  let fixture: ComponentFixture<TransationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
