import { CartProduct, Product } from "./product";


export interface CartItem {
  product: CartProduct;
  quantity: number;
}