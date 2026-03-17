import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { GithubProfileInterface, GithubProfileSummary } from '../../core/interfaces/github.interface';
import { GithubReposInterface, GithubRepositorySummary } from '../../core/interfaces/repos.interface';

@Component({
    selector: 'port-my-repositories',
    templateUrl: './my-repositories.component.html',
    styleUrl: './my-repositories.component.scss',
    standalone: false
})
export class MyRepositoriesComponent implements OnInit {
  public readonly repoPreviewCount = 6;
  public readonly githubProfileUrl = 'https://github.com/GerardoRegalado';
  public githubUser: GithubProfileSummary | null = null;
  public firstRepos: GithubRepositorySummary[] = [];
  public userRepos: GithubRepositorySummary[] = [];
  public githubStatus: 'idle' | 'loading' | 'ready' | 'cached' | 'error' = 'idle';
  public githubMessage = 'Fetching live GitHub data...';
  private readonly isBrowser: boolean;
  private readonly profileCacheKey = 'portfolio-github-profile';
  private readonly reposCacheKey = 'portfolio-github-repos';

  constructor(
    private github: GithubService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.hydrateFromCache();
    this.getGithubUser();
  }

  public getGithubUser(): void {
    this.githubStatus = this.githubUser ? 'cached' : 'loading';
    this.githubMessage = this.githubUser
      ? 'Refreshing GitHub data in the background.'
      : 'Fetching live GitHub data...';

    this.github.getUser().subscribe({
      complete: () => { console.info('Connection with Github Successful'); },
      error: (error: unknown) => {
        this.handleError('GitHub profile is temporarily unavailable.', error);
      },
      next: (data: GithubProfileInterface) => {
        this.githubUser = this.mapProfile(data);
        this.persistCache(this.profileCacheKey, this.githubUser);
        this.getRepos(this.githubUser.repos_url);
      }
    });
  }

  public getRepos(url: string): void {
    if (!url) {
      this.handleError('GitHub repository endpoint is unavailable.');
      return;
    }

    this.github.getRepos(url).subscribe({
      complete: () => { console.info('Connection with Repos Successfull'); },
      error: (error: unknown) => {
        this.handleError('GitHub repositories are temporarily unavailable.', error);
      },
      next: (data: GithubReposInterface[]) => {
        this.userRepos = this.mapRepos(data);
        this.firstRepos = this.userRepos.slice(0, this.repoPreviewCount);
        this.githubStatus = 'ready';
        this.githubMessage = 'Live GitHub data.';
        this.persistCache(this.reposCacheKey, this.userRepos);
      }
    });
  }

  public loadMore(): void {
    this.firstRepos = this.userRepos;
  }

  public hideRepos(): void {
    this.firstRepos = this.userRepos.slice(0, this.repoPreviewCount);
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

  public trackByRepoName(index: number, repo: GithubRepositorySummary): string {
    return `${index}-${repo.name}`;
  }

  private handleError(message: string, error?: unknown): void {
    console.error(message, error);
    if (this.githubUser && this.userRepos.length) {
      this.githubStatus = 'cached';
      this.githubMessage = 'GitHub is rate-limited right now. Showing cached data.';
      return;
    }

    this.githubStatus = 'error';
    this.githubMessage = message;
    this.firstRepos = [];
    this.userRepos = [];
  }

  private hydrateFromCache(): void {
    const cachedProfile = this.readCache<GithubProfileSummary>(this.profileCacheKey);
    const cachedRepos = this.readCache<GithubRepositorySummary[]>(this.reposCacheKey);

    if (!cachedProfile || !cachedRepos?.length) {
      return;
    }

    this.githubUser = cachedProfile;
    this.userRepos = cachedRepos;
    this.firstRepos = cachedRepos.slice(0, this.repoPreviewCount);
    this.githubStatus = 'cached';
    this.githubMessage = 'Showing cached GitHub data while we refresh.';
  }

  private mapProfile(profile: GithubProfileInterface): GithubProfileSummary {
    return {
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      followers: profile.followers,
      following: profile.following,
      html_url: profile.html_url,
      login: profile.login,
      name: profile.name,
      public_repos: profile.public_repos,
      repos_url: profile.repos_url
    };
  }

  private mapRepos(repos: GithubReposInterface[]): GithubRepositorySummary[] {
    return [...(repos ?? [])]
      .filter((repo) => !repo.archived && !repo.fork)
      .sort((current, next) => Date.parse(next.updated_at) - Date.parse(current.updated_at))
      .map((repo) => ({
        archived: repo.archived,
        clone_url: repo.clone_url,
        description: repo.description,
        fork: repo.fork,
        forks_count: repo.forks_count,
        git_url: repo.git_url,
        homepage: repo.homepage,
        html_url: repo.html_url,
        language: repo.language,
        name: repo.name,
        size: repo.size,
        ssh_url: repo.ssh_url,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        visibility: repo.visibility
      }));
  }

  private persistCache<T>(key: string, value: T): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Unable to persist cache for ${key}.`, error);
    }
  }

  private readCache<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const rawValue = window.localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) as T : null;
    } catch (error) {
      console.warn(`Unable to read cache for ${key}.`, error);
      return null;
    }
  }
}
