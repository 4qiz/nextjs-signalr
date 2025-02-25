import { useEffect, useState } from "react";
import { fetchOrders } from "@/services/orderService";
import { getSignalRConnection } from "@/services/signalRService";
import { Order } from "@/types/order";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        if (isMounted) setOrders(data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    };

    loadOrders();

    getSignalRConnection(
      (newOrder) => {
        if (isMounted) setOrders((prev) => [...prev, newOrder]);
      },
      (updatedOrder) => {
        if (isMounted) {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order
            )
          );
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return orders;
};
