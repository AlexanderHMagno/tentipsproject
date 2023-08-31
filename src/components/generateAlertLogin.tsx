"use client";
import Login from "@/app/admin/(auth)/login/page";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

export default function GenerateAlert({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (session) {
    return children;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Create an account to show love for this story.
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="p-10">
              <Login />
            </div>

            <div>
              <p className="my-10 text-center">
                Loves shows how much you appreciated this story.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}