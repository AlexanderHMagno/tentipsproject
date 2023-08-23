"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function EditEntry({ id }: any) {
  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";

  if (!authenticated) return <></>;

  return (
    <Link href={`./${id}/edit`}>
      <button className="ml-5 py-2 px-5 text-1xl rounded-full bg-brand text-white">
        Edit
      </button>
    </Link>
  );
}
