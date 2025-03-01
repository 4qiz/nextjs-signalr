import { useEffect, useState } from "react";
import { fetchOrders } from "@/services/orderService";
import { Order } from "@/types/order";
import { getAdminSignalRConnection } from "@/services/signalRAdminService";

export const adminJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi0KHQtdGA0LPQtdC5INCY0LLQsNC90L7QsiIsImVtYWlsIjoic2VyZ2V5Lml2YW5vdkB0ZXN0LnJ1Iiwic3ViIjoiMyIsImlkIjoiMyIsInJvbGUiOiJBRE1JTiIsImp0aSI6ImU1OGE5NzZjLWFkZWMtNDIxNy05ZDQ2LTM2NDI3YjRhOThhNCIsImlhdCI6MTc0MDY1MzUzOSwiZXhwIjoxNzQxMjU4MzM5LCJhdWQiOiJhcGkuNHFpei5ydSIsImlzcyI6IjRxaXoucnUifQ.mLTHPLSbTgve7Q2SS0L5gQofZoUGccp7N6MSv9XUrEA";

export const useAdminOrders = () => {
  const token = adminJwt;

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

    getAdminSignalRConnection(
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
