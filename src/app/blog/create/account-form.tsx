"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod";


import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react";


const accountFormSchema = z.object({
  solicitude: z
    .string()
    .min(10, {
      message: "Topic must be at least 10 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),

})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // solicitude: "Your solicitude",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {

    const [result, setResult] = useState("");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })



  async function onSubmit(info: AccountFormValues) {

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }


      console.log(data);
      setResult(data.result);
    } catch(error) {
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
     
        <Button type="submit">Generate Topic</Button>
      </form>
    </Form>

    <div  dangerouslySetInnerHTML={{ __html: result }}></div>
    </>
  )
}