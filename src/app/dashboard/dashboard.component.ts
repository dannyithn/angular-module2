import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) { }
  user: User = { id: 0, username: '', email: '' }
  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      //call user details service
      const userInfo = localStorage.getItem('userInfo')
      console.log(userInfo);
      
      this.user = JSON.parse(userInfo as string)
    }
  }
  logout() {
    this.auth.logout()
  }
}
