import { Order, OrderStatus } from "@/types/order";

const API_URL = "http://localhost:5046/api/order";

export const fetchOrders = async (token: string): Promise<Order[]> => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // if needed
    },
  });
  if (!response.ok) throw new Error("Ошибка при загрузке заказов");
  return response.json();
};

export const updateOrderStatus = async (
  token: string,
  id: number,
  status: OrderStatus
): Promise<Order> => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Ошибка обновления статуса");
  return response.json();
};

interface CreateOrderDto {
  customerName: string;
  totalAmount: number;
  userId: number;
}

export const createOrder = async (
  token: string,
  data: CreateOrderDto
): Promise<Order> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      customerName: data.customerName,
      totalAmount: data.totalAmount,
      userId: data.userId,
      status: "Pending",
    } satisfies Order),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании заказа");
  }

  return response.json();
};
