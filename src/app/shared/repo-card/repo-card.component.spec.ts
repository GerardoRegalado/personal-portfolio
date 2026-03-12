import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCardComponent } from './repo-card.component';

describe('RepoCardComponent', () => {
  let component: RepoCardComponent;
  let fixture: ComponentFixture<RepoCardComponent>;
  let clipboardSpy: jasmine.SpyObj<Clipboard>;

  beforeEach(async () => {
    clipboardSpy = jasmine.createSpyObj<Clipboard>('Clipboard', ['copy']);

    await TestBed.configureTestingModule({
      declarations: [RepoCardComponent],
      imports: [CommonModule],
      providers: [{ provide: Clipboard, useValue: clipboardSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RepoCardComponent);
    component = fixture.componentInstance;
    component.repo = {
      name: 'portfolio',
      language: 'TypeScript',
      size: 1,
      visibility: 'public',
      updated_at: '2026-03-12T00:00:00Z',
      html_url: 'https://github.com/example/repo',
      git_url: 'git://github.com/example/repo.git',
      clone_url: 'https://github.com/example/repo.git',
      ssh_url: 'git@github.com:example/repo.git'
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy link to clipboard', () => {
    component.copyLink('git://github.com/example/repo.git');

    expect(clipboardSpy.copy).toHaveBeenCalledWith('git://github.com/example/repo.git');
  });

  it('should open external link', () => {
    const openSpy = spyOn(window, 'open').and.returnValue(null);

    component.openLink('https://github.com/example/repo');

    expect(openSpy).toHaveBeenCalledWith('https://github.com/example/repo', '_blank', 'noopener,noreferrer');
  });
});
