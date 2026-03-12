import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubProfileInterface } from '../interfaces/github.interface';
import { GithubReposInterface } from '../interfaces/repos.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public URL = 'https://api.github.com/users/GerardoRegalado'

  constructor(private http: HttpClient) {}

  public getUser(): Observable<GithubProfileInterface> {
    return this.http.get<GithubProfileInterface>(this.URL);
  }

  public getRepos(repos_url: string): Observable<GithubReposInterface[]> {
    return this.http.get<GithubReposInterface[]>(repos_url);
  }
}
