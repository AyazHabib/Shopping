import { Injectable } from '@angular/core';

import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { CartItems } from '../model/cartItem';

export interface CartItemsState extends EntityState<CartItems, string> {
    areCartItemsLoaded: boolean;
}

export function createInitialState(): CartItemsState {
  return {
      areCartItemsLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'cartItems' })
export class CartItemStore extends EntityStore<CartItemsState> {

    constructor() {
        super(createInitialState());
    }

    loadCartItems(cartItems: CartItems[], areCartItemsLoaded: boolean) {
      this.set(cartItems);
      this.update(state => ({
        ...state,
        areCartItemsLoaded
      }));
    }
}
