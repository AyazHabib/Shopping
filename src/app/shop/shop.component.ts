import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../service/http-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public productList:any;
  public showDescription:boolean = false;
  constructor(private service: HttpServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.service.getProducts().subscribe((res) => {
      this.productList = res?.data
    },(err) => {
        alert('Something went wrong');
    });
  }

  public increment(product: any): void {
    product?.purchaseQty ? (product.purchaseQty=product?.purchaseQty + 1) : (product.purchaseQty = 1);
  }

  public decrement(product: any): void {
    product?.purchaseQty ? (product.purchaseQty=product?.purchaseQty - 1) : (product.purchaseQty = 0);
  }

  public showDetails(product:any): void {
    product.showDetails = !product.showDetails;
  }

  public addToCart(product: any){

  }

}
