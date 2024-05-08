import { Component } from '@angular/core';

interface Contributions {
  company: string;
  position: string;
  yearOfStart: number;
  link: string;
  location: string;
  active: boolean;
}

@Component({
  selector: 'port-professional-contributions',
  templateUrl: './professional-contributions.component.html',
  styleUrl: './professional-contributions.component.scss'
})
export class ProfessionalContributionsComponent {
public professional_contributions: Contributions[] = [
  {
    company: 'ASCENDYNAMICS',
    position: 'Frontend Developer',
    yearOfStart: 2024,
    link: 'https://ascendynamics.org',
    location: 'Chicago, US',
    active: true
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

public openLink(link: string) {
  window.open(link, '_blank')
}
}
