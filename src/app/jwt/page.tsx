"use client";

import { useOrders } from "@/hooks/useOrders";
import { updateOrderStatus } from "@/services/orderService";
import { OrderStatus } from "@/types/order";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const hubUrl = "http://localhost:5046/hubs/orders";

const JwtPage = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi0JDQvdC90LAg0KHQvNC40YDQvdC-0LLQsCIsImVtYWlsIjoiYW5uYS5zbWlybm92YUB0ZXN0LnJ1Iiwic3ViIjoiMiIsImlkIjoiMiIsInJvbGUiOiJVU0VSIiwianRpIjoiYzkyYmNhOGEtODE5MC00ZTU1LWFkZWUtNDYzY2FmZjc3ZjViIiwiaWF0IjoxNzQwNjQ0NjQwLCJleHAiOjE3NDEyNDk0NDAsImF1ZCI6ImFwaS40cWl6LnJ1IiwiaXNzIjoiNHFpei5ydSJ9.SkFS4qpoawJ6OOnuFffQGXrpeqQST7I-X-7jB64vEkY";

  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection
            .invoke("NewMessage", "sended param")
            .then((param) => console.log(param));
          console.log("CONNECTED");
          connection.on("messageReceived", (message) => {
            console.log("RECEIVED: ", message);
          });
        })
        .catch((e) => console.log("ERROR ", e));
    }
  }, [connection]);
  return <div>asdf</div>;
};

export default JwtPage;
