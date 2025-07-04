import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transation1Component } from './transation1.component';

describe('Transation1Component', () => {
  let component: Transation1Component;
  let fixture: ComponentFixture<Transation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transation1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
