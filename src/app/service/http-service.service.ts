import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CartItems } from '../model/cartItem';
import { CartItemStore } from '../store/cartItem.store';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  store: CartItemStore;
  constructor(private http: HttpClient, store: CartItemStore) {this.store = store  }

  public getProducts(): Observable<any> {
    return this.http.get("https://www.mocky.io/v2/5eda4003330000740079ea60")
    .pipe(map((res:any) => res)) //already contains json
  }

 
  addItems(item: CartItems): Observable<any> {
    this.store.add([item]);
    return of(null);
  }

  deleteItems(productId: number){
    this.store.remove(productId.toString());
  }

  updateItems(productId: number, item: CartItems, items:CartItems[]){
    this.store.update(productId.toString(), item);
    this.store.loadCartItems(items, true);
  }

  getAllItems(items: CartItems[]){
    this.store.loadCartItems(items, true);
  }


}
