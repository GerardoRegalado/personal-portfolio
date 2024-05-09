import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { GithubProfileInterface } from '../../core/interfaces/github.interface';
import { GithubReposInterface } from '../../core/interfaces/repos.interface';


@Component({
  selector: 'port-my-repositories',
  templateUrl: './my-repositories.component.html',
  styleUrl: './my-repositories.component.scss'
})
export class MyRepositoriesComponent implements OnInit {
  public githubUser!: GithubProfileInterface;
  public firstRepos!: GithubReposInterface[];
  public userRepos!: GithubReposInterface[];

  constructor(private github: GithubService){}

  ngOnInit(): void {
    this.getGithubUser();
  }

  public getGithubUser() {
    this.github.getUser().subscribe({
      complete: () => { console.info('Connection with Github Successful')},
      error: ()=> {
        alert('Error doing connection');
      },
      next: (data: any) => {
        this.githubUser = data as GithubProfileInterface;
        this.getRepos(this.githubUser.repos_url);
      }
    })
  }

  public getRepos(URL: string) {
    this.github.getRepos(URL).subscribe({
      complete: () => { console.info('Connection with Repos Successfull')},
      error: () => {
        alert('Error getting Repos');
      },
      next: (data : any) => {
        if (data.length){
          this.userRepos = data as GithubReposInterface[]
          this.firstRepos = data.slice(0,6) as GithubReposInterface[]
        }
      }
    })
  }

  public loadMore() {
    this.firstRepos = this.userRepos
  }

  public hideRepos() {
    this.firstRepos = this.userRepos.slice(0,6)
  }

  public openLink(link: string) {
    window.open(link, '_blank')
  }

}
