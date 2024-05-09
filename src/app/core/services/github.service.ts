import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public URL = 'https://api.github.com/users/GerardoRegalado'

  constructor(private http: HttpClient) {}

  public getUser() {
    return this.http.get(this.URL);
  }

  public getRepos(repos_url: string) {
    return this.http.get(repos_url);
  }
}
