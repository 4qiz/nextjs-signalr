import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/orders"}>заказы клиента</Link>
      <Link href={"/admin"}>менеджер</Link>
    </div>
  );
}
