import * as signalR from "@microsoft/signalr";

const hubUrl = "http://localhost:5046/hubs/orders"; // URL бекенда

export const createSignalRConnection = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, { withCredentials: true })
    .withAutomaticReconnect()
    .build();

  return connection;
};
