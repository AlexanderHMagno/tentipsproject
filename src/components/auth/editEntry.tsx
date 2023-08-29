import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EditEntry({ id }: any) {
  const session = await getServerSession(authOptions);

  //TODO: create a role for this account...
  const admin = session?.user?.email === "alexander.hortua10@gmail.com";
  if (!admin) return <></>;

  return (
    <Link href={`./${id}/edit`}>
      <button className="ml-5 py-2 px-5 text-1xl rounded-full bg-brand text-white">
        Edit
      </button>
    </Link>
  );
}
