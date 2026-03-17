import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { GithubRepositorySummary } from '../../core/interfaces/repos.interface';

@Component({
    selector: 'port-repo-card',
    templateUrl: './repo-card.component.html',
    styleUrl: './repo-card.component.scss',
    standalone: false
})
export class RepoCardComponent {
  @Input() repo!: GithubRepositorySummary;

  constructor(private clipboard: Clipboard) {}

  public openLink(link: string): void {
    if (typeof window === 'undefined' || !link) {
      return;
    }

    const newTab = window.open(link, '_blank', 'noopener,noreferrer');
    if (newTab) {
      newTab.opener = null;
    }
  }

  public copyLink(link: string): void {
    if (!link) {
      return;
    }

    this.clipboard.copy(link);
  }
}
