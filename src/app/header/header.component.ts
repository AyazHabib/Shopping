import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeHome: boolean = true;
  constructor(private router: Router) { }

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
