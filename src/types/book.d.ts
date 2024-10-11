import { Author, Book } from "@prisma/client";


type AuthorData = Omit<Author, "id">;


type BookWithAuthor = Book & {
  author: Author;
};

type BookData = Omit<Book, "id">;
