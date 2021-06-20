import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CartItemsState, CartItemStore } from '../store/cartItem.store';


@Injectable({
  providedIn: 'root'
})
export class CartItemsQuery extends QueryEntity<CartItemsState> {

  selectAreCartItemsLoaded$ = this.select(state => {
    return state.areCartItemsLoaded;
  });

  constructor(protected store: CartItemStore) {
    super(store);
  }
}
