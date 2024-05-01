import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalContributionsComponent } from './professional-contributions.component';

describe('ProfessionalContributionsComponent', () => {
  let component: ProfessionalContributionsComponent;
  let fixture: ComponentFixture<ProfessionalContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalContributionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
