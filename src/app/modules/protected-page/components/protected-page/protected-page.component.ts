import { Component } from '@angular/core';
import { IUser } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-protected-page',
  standalone: false,

  templateUrl: './protected-page.component.html',
})
export class ProtectedPageComponent {

  user: IUser | null = null;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
