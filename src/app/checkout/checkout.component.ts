import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartItems } from '../model/cartItem';
import { CartItemsQuery } from '../query/cartItem.query';
import { HttpServiceService } from '../service/http-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  deleteCartItemSub: Subscription = new Subscription;
  cartItems$: Observable<CartItems[]> = this.cartItemsQuery.selectAll();
  public total:number=0;
  public items:Array<CartItems> = [];
  constructor(private service: HttpServiceService,private cartItemsQuery: CartItemsQuery) { }

  ngOnInit(): void {
    this.calculateTotal();
  }

  public deleteItem(item?:any): void {
    for(let i=0; i < this.items.length; i++){
      if(this.items[i].id === item.id){
        this.items.splice(i, 1);
        break;
      }
    }
    this.service.getAllItems(this.items);
  }

  calculateTotal(){
    this.cartItems$.subscribe(result => {
      this.items = result;
      this.total = 0;
      result.forEach(val => {
        this.total += (val?.price * val?.purchaseQty);
      })
    })
  }

  ngOnDestroy() {
    if(this.deleteCartItemSub)
    this.deleteCartItemSub.unsubscribe();
  }
  
}
