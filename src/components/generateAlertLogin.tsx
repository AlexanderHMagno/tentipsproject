"use client";

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
import Cardlogin from "./loginForm";

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
      <AlertDialogContent className="bg-white dark:bg-black ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="text-center">
              Create an account to show love for this story.
            </p>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="w-full m-auto">
          {" "}
          <Cardlogin />{" "}
        </div>

        <div>
          <p className="text-center mt-2">
            Loves shows how much you appreciated this story.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
