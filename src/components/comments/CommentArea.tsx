"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "../icons";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  comment: z
    .string()
    .min(1)
    .max(1500, { message: "Message must be at most 1500 characteres" }),
});

export default function CommentForm({
  id,
  mutate,
}: {
  id: string;
  mutate: () => void;
}) {
  const { data: session } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const submit = await fetch(`/api/entries/comments/${id}`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await submit.json();

    mutate();
    form.reset();
  }

  if (!session?.user) return <h1>Login For adding a comment</h1>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-sm"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="w-full text-sm"
                  placeholder="Write down your thoughts"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end !my-[-1px]">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="bg-brand block text-white float-right rounded hover:bg-brand text-sm"
          >
            <span className="flex items-center">
              {form.formState.isSubmitting && (
                <Icons.spinner className="animate-spin" />
              )}
              Comment
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
