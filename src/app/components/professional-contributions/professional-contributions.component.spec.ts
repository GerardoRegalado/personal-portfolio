import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalContributionsComponent } from './professional-contributions.component';

describe('ProfessionalContributionsComponent', () => {
  let component: ProfessionalContributionsComponent;
  let fixture: ComponentFixture<ProfessionalContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalContributionsComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include contributions', () => {
    expect(component.professional_contributions.length).toBeGreaterThan(0);
  });

  it('should open external link', () => {
    const openSpy = spyOn(window, 'open').and.returnValue(null);

    component.openLink('https://example.com');

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
  });
});
