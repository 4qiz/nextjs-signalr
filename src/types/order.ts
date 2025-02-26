export type OrderStatus = "Pending" | "Confirmed" | "Shipped";

export interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  userId: number;
}
