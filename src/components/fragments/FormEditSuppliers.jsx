"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().trim().nonempty({ message: "Nama harus diisi" }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "Nama harus diisi" })
    .regex(/^[0-9]+$/, { message: "Nomor Telepon hanya boleh angka" }),
});

export default function FormEditCategories({
  handleSubmit,
  supplier,
  loading,
  loadingSubmit,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.setValue("name", supplier.name);
    form.setValue("phone", supplier.phone);
  }, [supplier, form]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col space-x-4 space-y-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-x-4 space-y-4 ">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukan Nomor Telepon"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <div className="mt-10">
            <Button variant="outline" type="submit" className="w-full md:w-1/4">
              {loadingSubmit ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
