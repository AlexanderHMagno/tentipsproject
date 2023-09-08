"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useSWR from "swr";
import { Icons } from "@/components/icons";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearInterval } from "timers";
import { Badge } from "@/components/ui/badge";

const accountFormSchema = z.object({
  solicitude: z
    .string()
    .min(10, {
      message: "Topic must be at least 10 characters.",
    })
    .max(500, {
      message: "Name must not be longer than 50 characters.",
    }),
  category: z.string(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // solicitude: "Your solicitude",
  category: "Animals",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AccountForm() {
  const [result, setResult] = useState("");
  const [progression, setProgress] = useState(25);
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    if (submitLoading) {
      const timer = setTimeout(() => setProgress(progression - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [submitLoading, progression]);

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_PROJECT_URL}/api/categories`, fetcher);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(info: AccountFormValues) {
    try {
      setSubmitLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      return router.push(`/blog/${data.result}`);
    } catch (error) {
      // Consider implementing your own error handling logic here
    }
  }

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="solicitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your solicitude" {...field} />
                </FormControl>
                <FormDescription>
                  This is the Topic that will be used to generate a new entry.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-5">Category</FormLabel>
                <FormControl>
                  <select placeholder="Category" {...field}>
                    {categories.map((option: any) => (
                      <option key={option._id} value={option.title}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-brand w-full hover:bg-orange-600"
            type="submit"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <span className="flex">
                <Icons.spinner className="animate-spin" />
                Loading
              </span>
            ) : (
              "Generate Topic"
            )}
          </Button>
        </form>
      </Form>

      <div dangerouslySetInnerHTML={{ __html: result }}></div>
      {submitLoading && (
        <div className="w-full m-auto text-center">
          <span className="">
            Article will be ready in :{" "}
            <Badge variant={"outline"} className="text-bold bg-brand">
              {progression} seg
            </Badge>
          </span>
        </div>
      )}
    </>
  );
}
