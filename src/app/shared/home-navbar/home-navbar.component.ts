import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/services/authentication.service';
import { appBrandName } from '@app/core/core.constant';
import { CredentialsService } from '@app/auth/services/credentials.service';
import {CartService} from "@app/core/service/cart.service";

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  readonly appBrandName = appBrandName;

  isNavCollapse: boolean = true;
  isLoggedIn: boolean = false;
  firstName: string | undefined;

  totalCartItems: number = 0;

  constructor(private credentialsService: CredentialsService, private authenticationService: AuthenticationService, private cartService: CartService) { }

  ngOnInit(): void {
    this.initializeLoggedInDetails();
    this.cartService.cartTotal.subscribe({
      next: value => this.totalCartItems = value
    });
  }

  private initializeLoggedInDetails() {
    this.isLoggedIn = this.credentialsService.isAuthenticated();
    if (this.isLoggedIn) {
      const credentials = this.credentialsService.getCredentials();
      this.firstName = credentials?.fullName;
    }
  }

  toggleNavbarClass(): void {
    this.isNavCollapse = !this.isNavCollapse;
  }

  logout() {
    this.authenticationService.logout();
  }

}
