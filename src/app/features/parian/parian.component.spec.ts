import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParianComponent } from './parian.component';

describe('ParianComponent', () => {
  let component: ParianComponent;
  let fixture: ComponentFixture<ParianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
