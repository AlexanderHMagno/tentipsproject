"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { categories } from "@/lib/data/categories";

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
import { useState } from "react";

const accountFormSchema = z.object({
  solicitude: z.string().max(500, {
    message: "Name must not be longer than 50 characters.",
  }),
  type: z.string(),
  category: z.string(),
  number: z.any(),
  allCategories: z.boolean(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  solicitude: "",
  type: "queue",
  category: "Art",
  number: 10,
  allCategories: false,
};

export function AccountForm() {
  const [result, setResult] = useState("");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(info: AccountFormValues) {
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(info),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      //   alert(error.message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select placeholder="Category" {...field}>
                    {categories.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of stories</FormLabel>
                <FormControl>
                  <select placeholder="stories" {...field}>
                    {[2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                      (option: number) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="solicitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Subcategory</FormLabel>
                <FormControl>
                  <Input placeholder="Type " {...field} />
                </FormControl>
                <FormDescription>
                  This subcategory will be mixed with the principal to generate
                  some topics
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allCategories"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Create for each category?</FormLabel>
                  <FormControl>
                    <Input type="checkbox" checked={field.value} {...field} />
                  </FormControl>
                  <FormDescription>
                    If selected we are going to create questions for each
                    registered category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            className="bg-orange-400 w-full hover:bg-orange-600"
            type="submit"
          >
            Generate Questions
          </Button>
        </form>
      </Form>

      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </>
  );
}
