import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
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
});
