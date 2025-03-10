import * as signalR from "@microsoft/signalr";
import { Order } from "@/types/order";

const hubUrl = "http://localhost:5046/hubs/orders";

let connection: signalR.HubConnection | null = null;

export const getSignalRConnection = async (
  token: string,
  onOrderUpdated: (order: Order) => void
) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    connection.on("OrderUpdated", onOrderUpdated);

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
