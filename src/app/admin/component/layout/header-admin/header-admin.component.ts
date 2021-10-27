import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/service/loginService/token-storage.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_STAFF');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
  }
}

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
