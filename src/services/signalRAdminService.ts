import * as signalR from "@microsoft/signalr";
import { Order } from "@/types/order";
import { adminJwt } from "@/hooks/useAdminOrders";

const hubUrl = "http://localhost:5046/hubs/orders";

let connection: signalR.HubConnection | null = null;

export const getAdminSignalRConnection = async (
  onNewOrder: (order: Order) => void,
  onOrderUpdated: (order: Order) => void
) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => adminJwt })
      .withAutomaticReconnect()
      .build();

    connection.on("NewOrderAdmin", onNewOrder);
    connection.on("OrderUpdatedAdmin", onOrderUpdated);

    try {
      await connection.start();
      console.log("✅ SignalR подключен");
    } catch (err) {
      console.error("Ошибка подключения к SignalR:", err);
    }
  }

  // Отключаем соединение при закрытии вкладки
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      if (connection) {
        connection.stop();
        console.log("⛔ SignalR отключен");
      }
    });
  }

  return connection;
};
