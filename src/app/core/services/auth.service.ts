import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = 'https://dummyjson.com/auth/login';
  private tokenKey = 'token';
  private userKey = 'userData';

  constructor(private http: HttpClient, private route: Router) { }

  public login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.urlApi, { username, password }).pipe(
      tap((response: IUser) => {
        if (response.accessToken) {
          this.setToken(response.accessToken);
          this.setUserData(response);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  private setUserData(user: IUser): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getUserData(): IUser | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  public isAuth(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp
      console.log(expiration)
      return expiration * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.route.navigate(['/login']);
  }
}
