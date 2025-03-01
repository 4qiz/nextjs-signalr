"use client";

import { useOrders } from "@/hooks/useOrders";
import Link from "next/link";

export const dynamic = "force-dynamic";

const OrdersPage = () => {
  const orders = useOrders();

  return (
    <div>
      <Link href={"/orders/create"}>Создать заказ</Link>
      <h1>Мои заказы</h1>
      {orders.map((order) => (
        <div key={order.id} className="m-3 border rounded-lg p-3">
          <p>Имя: {order.customerName}</p>
          <p>Сумма: {order.totalAmount} ₽</p>
          <p>Статус: {order.status}</p>
          <p>user id: {order.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
