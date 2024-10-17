"use client";

import { getAuthors } from "@/actions/getAuthors";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBook } from "@/actions/createBook";
import IsAuthed from "../Auth/IsAuthed";
import { Author, Book } from "@prisma/client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData, BookWithAuthor } from "@/types/book";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import BookCategorySelect from "./BookCategorySelect";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { updateBook } from "@/actions/updateBook";

const bookSchema = z.object({
  title: z.string().min(1, {
    message: "Valid title required",
  }),
  authorId: z.string().min(1, {
    message: "Choose an author",
  }),
  cover: z.string().min(1, {
    message: "Cover url is required",
  }).url({
    message: "Cover has to be a valid url",
  }),
  categories: z.array(z.string()).min(1, {
    message: "At least one category is required",
  }),
});

type BookFormProps = {
  authors: Author[];
  book?: Book;
};

export default function BookForm({ authors, book }: BookFormProps) {
  const router = useRouter();
  const user = useUser();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title,
      cover: book?.cover,
      authorId: book?.authorId,
      categories: book?.categories,
    },
  });

  console.log("Form", form.formState.errors);

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    const onSuccess = (_book: Book) => {
      router.push(`/`);
    }
    if(user.token) {
      if(book) {
        const updatedBook = await updateBook(book.id, values as BookData, user.token);
        if(updatedBook) {
          console.log("Book updated", updatedBook);
          onSuccess(updatedBook);
        }
        return;
      }
      const createdBook =  await createBook(values as BookData, user.token);
      if(createdBook) {
        console.log("Book created", createdBook);
        onSuccess(createdBook);
      }
    }
  }
  return (
    <IsAuthed message="Only logged in users can create books">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>
            {book ? "Edit Book" : "New Book"}
          </CardTitle>
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
                    {form.formState.errors.cover && (
                      <p className="text-red-500">
                        {form.formState.errors.cover.message}
                      </p>
                    )}
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
                {book ? "Update book" : "Create book"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </IsAuthed>
  );
}
