import { useEffect, useState } from "react";
import { fetchOrders } from "@/services/orderService";
import { getSignalRConnection } from "@/services/signalRService";
import { Order } from "@/types/order";

export const tokenJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi0JDQvdC90LAg0KHQvNC40YDQvdC-0LLQsCIsImVtYWlsIjoiYW5uYS5zbWlybm92YUB0ZXN0LnJ1Iiwic3ViIjoiMiIsImlkIjoiMiIsInJvbGUiOiJVU0VSIiwianRpIjoiYzkyYmNhOGEtODE5MC00ZTU1LWFkZWUtNDYzY2FmZjc3ZjViIiwiaWF0IjoxNzQwNjQ0NjQwLCJleHAiOjE3NDEyNDk0NDAsImF1ZCI6ImFwaS40cWl6LnJ1IiwiaXNzIjoiNHFpei5ydSJ9.SkFS4qpoawJ6OOnuFffQGXrpeqQST7I-X-7jB64vEkY";
// export const tokenJwt =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi0JjQstCw0L0g0J_QtdGC0YDQvtCyIiwiZW1haWwiOiJpdmFuLnBldHJvdkB0ZXN0LnJ1Iiwic3ViIjoiMSIsImlkIjoiMSIsInJvbGUiOiJVU0VSIiwianRpIjoiZjc2ZjBiMWYtNDgxOS00NTQ0LWEzMDItYmY4ZWU4YmZiMDQ3IiwiaWF0IjoxNzQwNjUzMTE1LCJleHAiOjE3NDEyNTc5MTUsImF1ZCI6ImFwaS40cWl6LnJ1IiwiaXNzIjoiNHFpei5ydSJ9.csJfQtSvwFYU78NqgnTVFDb1RtYAmmH3ir-V_hsiKJA";

export const useOrders = () => {
  const token = tokenJwt;

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const data = await fetchOrders(token);
        if (isMounted) setOrders(data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    };

    loadOrders();

    getSignalRConnection(token, (updatedOrder) => {
      if (isMounted) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return orders;
};
