import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { GithubProfileInterface } from '../../core/interfaces/github.interface';
import { GithubReposInterface } from '../../core/interfaces/repos.interface';


@Component({
    selector: 'port-my-repositories',
    templateUrl: './my-repositories.component.html',
    styleUrl: './my-repositories.component.scss',
    standalone: false
})
export class MyRepositoriesComponent implements OnInit {
  public githubUser: GithubProfileInterface | null = null;
  public firstRepos: GithubReposInterface[] = [];
  public userRepos: GithubReposInterface[] = [];
  private readonly isBrowser: boolean;

  constructor(
    private github: GithubService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.getGithubUser();
    }
  }

  public getGithubUser(): void {
    this.github.getUser().subscribe({
      complete: () => { console.info('Connection with Github Successful')},
      error: (error: unknown)=> {
        this.handleError('Error doing connection', error);
      },
      next: (data: GithubProfileInterface) => {
        this.githubUser = data;
        this.getRepos(this.githubUser.repos_url);
      }
    })
  }

  public getRepos(URL: string): void {
    if (!URL) {
      return;
    }

    this.github.getRepos(URL).subscribe({
      complete: () => { console.info('Connection with Repos Successfull')},
      error: (error: unknown) => {
        this.handleError('Error getting Repos', error);
      },
      next: (data : GithubReposInterface[]) => {
        this.userRepos = data ?? [];
        this.firstRepos = this.userRepos.slice(0, 6);
      }
    })
  }

  public loadMore(): void {
    this.firstRepos = this.userRepos
  }

  public hideRepos(): void {
    this.firstRepos = this.userRepos.slice(0, 6)
  }

  public openLink(link: string): void {
    if (!this.isBrowser || !link) {
      return;
    }

    const newTab = window.open(link, '_blank', 'noopener,noreferrer');
    if (newTab) {
      newTab.opener = null;
    }
  }

  private handleError(message: string, error?: unknown): void {
    console.error(message, error);
    if (this.isBrowser) {
      window.alert(message);
    }
  }

}
