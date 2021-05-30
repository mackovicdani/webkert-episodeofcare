import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EocProfileComponent } from './eoc-profile.component';

describe('EocProfileComponent', () => {
  let component: EocProfileComponent;
  let fixture: ComponentFixture<EocProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EocProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EocProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
