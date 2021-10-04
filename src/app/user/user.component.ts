import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/service/loginService/token-storage.service';
import { CartService } from 'src/service/userService/cartService/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private cartService: CartService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_STAFF');

      this.username = user.username;
    }

    this.updateCartStatus();
  }

  /** Update status cart when add to cart */

  updateCartStatus() {
    //subscribe to the events
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  /** Logout and navigate to login page */

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/user/login']);
    this.ngOnInit();
  }

}
