"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { status, data: sesssion } = useSession();

  if (status === "authenticated") {
    router.push("/blog");
    return;
  }

  return (
    <Card className="border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log in to your account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid  gap-6">
          <Button
            variant="outline"
            className="w-full bg-brand text-white"
            onClick={() => signIn("google")}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        {/* Do not have an account? <Button></Button>{" "}
        <Link href="/admin/register">Sign Up</Link> */}
      </CardFooter>
    </Card>
  );
};

export default Login;
