import { useState } from "react";
import { Order } from "@/types/order";
import { createOrder } from "@/services/orderService";
import { redirect } from "next/navigation";

interface CheckoutFormProps {
  onOrderCreated?: (order: Order) => void;
}

export const CheckoutForm = ({ onOrderCreated }: CheckoutFormProps) => {
  const [customerName, setCustomerName] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const order = await createOrder({
        customerName,
        totalAmount: parseFloat(totalAmount),
      });

      onOrderCreated?.(order); // Обновляем список заказов

      setCustomerName("");
      setTotalAmount("");

      redirect("/orders");
    } catch (err) {
      setError("Ошибка при создании заказа. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя клиента"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        className="text-black"
      />
      <input
        type="number"
        placeholder="Сумма"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
        required
        min="1"
        className="text-black"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Создание..." : "Оформить заказ"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
