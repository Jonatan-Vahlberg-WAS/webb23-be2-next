"use client";

import { getAuthors } from "@/actions/getAuthors";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBook } from "@/actions/createBook";
import IsAuthed from "../Auth/IsAuthed";
import { Author } from "@prisma/client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData } from "@/types/book";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import BookCategorySelect from "./BookCategorySelect";

const bookSchema = z.object({
  title: z.string().min(1, {
    message: "Valid title required",
  }),
  authorId: z.string().min(1, {
    message: "Choose an author",
  }),
  cover: z.string().min(1, {
    message: "Cover url is required",
  }),
  categories: z.array(z.string()).min(1, {
    message: "At least one category is required",
  }),
});

type BookFormProps = {
  authors: Author[];
};

export default function BookForm({ authors }: BookFormProps) {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      cover: "",
      authorId: "",
      categories: [],
    },
  });

  console.log("Form", form.formState.errors);

  function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log(values);
  }
  return (
    <IsAuthed message="Only logged in users can create books">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title" {...field} />
                    </FormControl>
                    {form.formState.errors.title && (
                      <p className="text-red-500">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <select
                        className="block p-1 border-gray-100 border-2 w-full "
                        {...field}
                      >
                        <option disabled value={""}>
                          Select Author
                        </option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.firstName} {author.lastName}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book cover</FormLabel>
                    <FormControl>
                      <Input placeholder="Book Cover" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <br />
                    <FormControl>
                      <BookCategorySelect
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-3" type="submit">
                Create Book
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </IsAuthed>
  );
}
