import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { User } from './models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    users = [
        { id: 1, username: 'admin', email: "admin@mail.com", password: 'admin123' }, 
        { id: 2, username: 'test', email: "test@mail.com", password: 'test' }
    ]
    
    constructor(private router: Router, private http: HttpClient) { }

    isAuthenticated(): boolean {
        if (localStorage.getItem('token') !== null) {
            return true;
        }
        return false;
    }

    canAccess() {
        if (!this.isAuthenticated()) {
            //redirect to login
            this.router.navigate(['/login']);
            localStorage.setItem('redirectUrl', this.router.url);
        }
    }
    canAuthenticate() {
        if (this.isAuthenticated()) {
            //redirect to dashboard
            const redirectUrl = localStorage.getItem('redirectUrl')
            if (redirectUrl) {
                this.router.navigate([redirectUrl]);
            } else {
                this.router.navigate(['/dashboard']);
            }
        }
    }

    storeToken(token: string) {
        localStorage.setItem('token', token);
    }
    storeInfo(user: User) {
        localStorage.setItem('userInfo', JSON.stringify(user))
    }
    login(username: string, password: string): Observable<any> {
        // fake authentication
        const userFound = this.users.find((user) => user.username === username && user.password === password)
        if (userFound) {
            return of({ token: "123423asdfasd21341", message: "Login Success", this: { id: userFound.id, username: userFound.username, email: userFound.email } })
        } else {
            return throwError('Fail');
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('redirectUrl');
        this.router.navigate(['/login']);
    }
}