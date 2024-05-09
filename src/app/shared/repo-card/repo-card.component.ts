import { Component, Input } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

import { GithubReposInterface } from '../../core/interfaces/repos.interface';

@Component({
  selector: 'port-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss'
})
export class RepoCardComponent {
  @Input() repo!: GithubReposInterface

  constructor(private clipboard:Clipboard){}

  public openLink(link: string) {
    window.open(link, '_blank')
  }

  public copyLink(link:string){
    this.clipboard.copy(link)
  }
}
