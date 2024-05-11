import { Component } from '@angular/core';
import { StudiesInterface } from '../../core/interfaces/contributions';

@Component({
  selector: 'port-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.scss'
})
export class StudiesComponent {

  public studies: StudiesInterface[] = [

    {
      school: 'EF Standar English Test',
      career: 'EF SET English Certificate (C1 Advanced)',
      location: 'Remote',
      yearOfStart: '2024',
      yearOfEnd: '2024',
      concluded: true
    },
    {
      school: 'Iron Hack',
      career: 'Fullstack Developer',
      location: 'Mexico City',
      yearOfStart: '2022',
      yearOfEnd: '2022',
      concluded: true
    },
    {
      school: 'Universidad Tecnologica Metropolitana de Chile',
      career: 'Engineering',
      location: 'Santiago, Chile',
      yearOfStart: '2016',
      yearOfEnd: '2016',
      concluded: true
    },
    {
      school: 'Universidad Politecnica de Aguascalientes',
      career: 'Engineering',
      location: 'Aguascalientes, Mexico',
      yearOfStart: '2012',
      yearOfEnd: '2016',
      concluded: true
    }
  ]
}
