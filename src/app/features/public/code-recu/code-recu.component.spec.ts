import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRecuComponent } from './code-recu.component';

describe('CodeRecuComponent', () => {
  let component: CodeRecuComponent;
  let fixture: ComponentFixture<CodeRecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRecuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
