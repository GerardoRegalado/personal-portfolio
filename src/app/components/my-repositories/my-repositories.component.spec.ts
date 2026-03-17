import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { throwError, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRepositoriesComponent } from './my-repositories.component';
import { GithubService } from '../../core/services/github.service';

describe('MyRepositoriesComponent', () => {
  let component: MyRepositoriesComponent;
  let fixture: ComponentFixture<MyRepositoriesComponent>;

  const githubServiceMock = {
    getUser: jasmine.createSpy('getUser').and.returnValue(of({ repos_url: '' })),
    getRepos: jasmine.createSpy('getRepos').and.returnValue(of([]))
  };

  beforeEach(async () => {
    githubServiceMock.getUser.calls.reset();
    githubServiceMock.getRepos.calls.reset();
    githubServiceMock.getUser.and.returnValue(of({ repos_url: '' }));
    githubServiceMock.getRepos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [MyRepositoriesComponent],
      imports: [CommonModule],
      providers: [
        { provide: GithubService, useValue: githubServiceMock },
        { provide: PLATFORM_ID, useValue: 'server' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not fetch github data on server platform', () => {
    expect(githubServiceMock.getUser).not.toHaveBeenCalled();
  });

  it('should load and hide repositories', () => {
    component.userRepos = new Array(8).fill({}) as any[];

    component.loadMore();
    expect(component.firstRepos.length).toBe(8);

    component.hideRepos();
    expect(component.firstRepos.length).toBe(6);
  });

  it('should keep cached status when github request fails after data exists', () => {
    component.githubUser = {
      avatar_url: 'https://example.com/avatar.png',
      created_at: '2026-03-12T00:00:00Z',
      followers: 10,
      following: 2,
      html_url: 'https://github.com/example',
      login: 'example',
      name: 'Example',
      public_repos: 8,
      repos_url: 'https://api.github.com/users/example/repos'
    };
    component.userRepos = [{}] as any[];
    component.firstRepos = [{}] as any[];
    githubServiceMock.getUser.and.returnValue(throwError(() => new Error('rate limit')));

    component.getGithubUser();

    expect(component.githubStatus).toBe('cached');
  });
});
