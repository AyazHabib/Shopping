import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../service/http-service.service';
import { Observable, Subscription } from 'rxjs';
import { tap, switchMap, filter } from 'rxjs/operators';
import { CartItemsQuery } from '../query/cartItem.query';
import { CartItems } from '../model/cartItem';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public productList:any;
  public showDescription:boolean = false;
  public updateCartItemsSub: Subscription = new Subscription;
  cartItems$: Observable<CartItems[]> = this.cartItemsQuery.selectAll();
  public items:Array<CartItems>  = [];

  constructor(private service: HttpServiceService, private cartItemsQuery: CartItemsQuery) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartItems$.subscribe(result => {
      this.items = result;
    })
  }

  private getProducts(){
    this.service.getProducts().subscribe((res) => {
      this.productList = res?.data
      if(this.items?.length > 0){
        this.items.forEach(val => {
          var item = Object.assign({}, val);
          let index = this.productList.findIndex((obj:any)=> obj.id ===val.id);
          this.productList[index] = item;
        });
      }
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
    var item = Object.assign({}, product);
    if(this.items && this.items.length > 0){
      let index = this.items.findIndex((obj:any)=> obj.id ===product.id);
      if(index <= -1){
        this.items.push(item)
      } else {
        this.items[index] = item;
      }
    } else {
      this.items.push(item);
    }
    this.service.updateItems(item.id, item, this.items);
  }

  ngOnDestroy() {
    if(this.updateCartItemsSub){
      this.updateCartItemsSub.unsubscribe();
    }
  }

}
