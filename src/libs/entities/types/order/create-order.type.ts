export type TCreateOrderRequest = {
  product: {
    product_id: number;
    price: number;
    quantity?: number;
  }[];
  customer_name: string;
  customer_address: string;
  payment_method: string;
  payment_amount: number;
};
