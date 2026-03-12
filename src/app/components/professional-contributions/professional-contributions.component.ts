import { Component } from '@angular/core';
import { ContributionsInterface } from '../../core/interfaces/contributions';

@Component({
    selector: 'port-professional-contributions',
    templateUrl: './professional-contributions.component.html',
    styleUrl: './professional-contributions.component.scss',
    standalone: false
})
export class ProfessionalContributionsComponent {
public professional_contributions: ContributionsInterface[] = [
  {
    company: 'ASCENDYNAMICS',
    position: 'Fullstack Developer Junior',
    yearOfStart: 2024,
    link: 'https://ascendynamics.org',
    location: 'Chicago, US',
    active: true
  },
  {
    company: 'Occupop Onboarding',
    position: 'Frontend Developer',
    yearOfStart: 2024,
    link: 'https://onboarding.occupop.com/signin/',
    location: 'Dublin, Ireland',
    active: true
  },
  {
    company: 'Open Forge - Startup Wars',
    position: 'Frontend Developer Junior',
    yearOfStart: 2022,
    link: 'https://portal.startupwars.com/',
    location: 'Philadelphia, US',
    active: false
  },
  {
    company: 'OneCarNow',
    position: 'Frontend Developer Junior',
    yearOfStart: 2021,
    link: 'https://www.onecarnow.com',
    location: 'Mexico City',
    active: false
  },
  {
    company: 'IronHack',
    position: 'Fullstack Developer Junior',
    yearOfStart: 2021,
    link: 'https://www.ironhack.com/es',
    location: 'Mexico City',
    active: false
  },
]

public openLink(link: string): void {
  if (typeof window === 'undefined' || !link) {
    return;
  }

  const newTab = window.open(link, '_blank', 'noopener,noreferrer');
  if (newTab) {
    newTab.opener = null;
  }
}
}
