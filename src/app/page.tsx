import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <Link href={"/orders"}>заказы клиента</Link>
      <Link href={"/admin"}>менеджер</Link>
      <Link href={"/jwt"}>JWT test</Link>
    </div>
  );
}
