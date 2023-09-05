"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cardlogin() {
  const router = useRouter();
  const { status, data: sesssion } = useSession();

  if (status === "authenticated") {
    router.push("/blog");
    return;
  }

  return (
    <Card className="border-0 ">
      <div className="p-0 md:p-10">
        <CardHeader className="space-y-1 mb-10">
          <CardTitle className="text-2xl text-center font-bold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="grid">
          <div className="mt-5">
            <Button
              variant="outline"
              className="w-full px-2  rounded-full grid grid-cols-12 gap-6"
              onClick={() => signIn("google")}
            >
              <Icons.google className="mr-2 h-5 w-5  justify-self-start col-span-3" />
              <span className="col-span-8 text-left">Sign in with Google</span>
            </Button>
          </div>
          <div className="mt-5">
            <Button
              variant="outline"
              className="w-full px-2  rounded-full grid grid-cols-12 gap-6"
              onClick={() => signIn("facebook")}
            >
              <Icons.facebook className="mr-2 h-5 w-5  justify-self-start col-span-3" />
              <span className="col-span-8 text-left whitespace-nowrap">
                Sign in with Facebook (soon)
              </span>
            </Button>
          </div>
          <div className="mt-5">
            <Button
              variant="outline"
              className="w-full px-2  rounded-full grid grid-cols-12 gap-6"
              onClick={() => signIn("google")}
            >
              <Icons.email className="mr-2 h-5 w-5  justify-self-start col-span-3" />
              <span className="col-span-8 text-left">
                Sign in with Email (soon)
              </span>
            </Button>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <small className="mt-10 text-gray-400 w-full m-auto">
          Click “Sign In” to agree to 10 Tips Terms of Service and acknowledge
          that 10 Tips{" "}
          <Link href={"/privacy"} className="font-bold">
            Privacy Policy
          </Link>{" "}
          applies to you.
        </small>
      </CardFooter>
    </Card>
  );
}
