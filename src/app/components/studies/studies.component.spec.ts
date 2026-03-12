import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesComponent } from './studies.component';

describe('StudiesComponent', () => {
  let component: StudiesComponent;
  let fixture: ComponentFixture<StudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudiesComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have studies list', () => {
    expect(component.studies.length).toBeGreaterThan(0);
  });
});
