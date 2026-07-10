export interface Plan {
  id: string,
  name: string,
  features: string[],
  price: number,
  description: string,
}

export interface Product {
  // campos obligatorios en el cart
  id: string;
  name: string;
  image?: string;
  plans: Plan[];
}


export interface CartProduct {
  id: string;
  name: string;
  features: string[],
  price: number,
  description: string,
  image: string;
}