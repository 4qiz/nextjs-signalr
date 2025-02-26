"use client";

import { useOrders } from "@/hooks/useOrders";
import { updateOrderStatus } from "@/services/orderService";
import { OrderStatus } from "@/types/order";

export const dynamic = "force-dynamic";

const AdminPage = () => {
  const orders = useOrders();

  const handleStatusChange = (id: number, status: OrderStatus) => {
    updateOrderStatus(id, status).catch(console.error);
  };

  return (
    <div>
      <h1>Заказы менеджера</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Имя: {order.customerName}</p>
          <p>Сумма: {order.totalAmount} ₽</p>
          <p>Статус: {order.status}</p>
          <p>user id: {order.userId}</p>
          <div className="flex gap-3 ">
            <button onClick={() => handleStatusChange(order.id, "Confirmed")}>
              Подтвердить
            </button>
            <button onClick={() => handleStatusChange(order.id, "Shipped")}>
              Отправить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
