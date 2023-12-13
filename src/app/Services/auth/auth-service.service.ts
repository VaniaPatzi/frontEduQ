import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: AuthService) {}

  isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }
}
