import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItems } from '../model/cartItem';
import { CartItemsQuery } from '../query/cartItem.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeHome: boolean = true;
  cartItems$: Observable<CartItems[]> = this.cartItemsQuery.selectAll();
  constructor(private router: Router,private cartItemsQuery: CartItemsQuery) { }

  ngOnInit(): void {
  }

  public navigateToCheckout(): void {
    this.activeHome = false;
    this.router.navigate(['checkout']);
  }

  public home(): void {
    this.activeHome = true;
  }

}
